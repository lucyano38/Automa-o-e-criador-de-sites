import Stripe from 'stripe';
import { getStripe, safeDbSave } from '../_lib';

export const config = { api: { bodyParser: false } };

async function readRaw(req: any): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return Buffer.from(req.body);
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk as any));
  return Buffer.concat(chunks);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();
  if (!stripe || !secret) {
    console.error('[Webhook] STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET nao configurado');
    return res.status(500).json({ error: 'Webhook do Stripe nao configurado' });
  }

  const raw = await readRaw(req);
  const sig = req.headers['stripe-signature'] as string | undefined;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig || '', secret);
  } catch (err: any) {
    console.error('[Webhook] Assinatura invalida:', err?.message || err);
    return res.status(400).json({ error: 'Assinatura de webhook invalida' });
  }

  const obj: any = event.data?.object || {};

  try {
    if (event.type === 'checkout.session.completed') {
      const session: any = obj;
      const userId = session.client_reference_id;
      const serviceId = session.metadata?.serviceId || 'servico-direto';
      const customerEmail = session.customer_details?.email || session.metadata?.customerEmail || '';
      const customerName = session.customer_details?.name || session.metadata?.customerName || '';
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      const orderId = `STRIPE-${(session.id || Date.now().toString()).slice(-8).toUpperCase()}`;

      await safeDbSave('orders', session.id || orderId, {
        orderId,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer || null,
        customerEmail,
        customerName,
        serviceId,
        serviceTitle: session.metadata?.serviceTitle || 'Servico Foco em Dados',
        amountTotal,
        currency: session.currency || 'brl',
        paymentStatus: 'paid',
        status: 'paid',
        source: 'stripe_checkout_session',
        paidAt: new Date().toISOString()
      });

      if (userId && userId !== 'guest') {
        await safeDbSave('subscriptions', session.id, {
          userId,
          stripeCustomerId: session.customer,
          status: 'active',
          plan: serviceId,
          updatedAt: new Date().toISOString()
        });
      }

      if (serviceId === 'editor-pro' || session.metadata?.plan === 'editor-pro') {
        await safeDbSave('editorProAccess', userId, {
          userId,
          email: customerEmail,
          plan: 'editor-pro',
          status: 'active',
          stripeCustomerId: session.customer || null,
          stripeSubscriptionId: session.subscription || null,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          monthKey: new Date().toISOString().slice(0, 7),
          videosUsed: 0,
          activatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      return res.status(200).json({ received: true, orderId, status: 'processed' });
    }

    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      await safeDbSave('subscriptions', obj.id, {
        stripeSubscriptionId: obj.id,
        stripeCustomerId: obj.customer,
        status: obj.status,
        currentPeriodEnd: obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null,
        updatedAt: new Date().toISOString()
      });

      const proUserId = obj.metadata?.userId || obj.metadata?.client_reference_id;
      if (obj.metadata?.plan === 'editor-pro' && proUserId) {
        await safeDbSave('editorProAccess', proUserId, {
          userId: proUserId,
          plan: 'editor-pro',
          status: obj.status === 'active' || obj.status === 'trialing' ? 'active' : obj.status,
          stripeSubscriptionId: obj.id,
          stripeCustomerId: obj.customer,
          currentPeriodEnd: obj.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null,
          updatedAt: new Date().toISOString()
        });
      }
      return res.status(200).json({ received: true, subscriptionId: obj.id, status: obj.status });
    }

    if (event.type === 'customer.subscription.deleted') {
      await safeDbSave('subscriptions', obj.id, {
        status: 'canceled',
        canceledAt: new Date().toISOString()
      });
      const proUserId = obj.metadata?.userId || obj.metadata?.client_reference_id;
      if (obj.metadata?.plan === 'editor-pro' && proUserId) {
        await safeDbSave('editorProAccess', proUserId, {
          userId: proUserId,
          plan: 'editor-pro',
          status: 'canceled',
          stripeSubscriptionId: obj.id,
          canceledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      return res.status(200).json({ received: true, subscriptionId: obj.id, status: 'canceled' });
    }

    if (event.type === 'payment_intent.succeeded') {
      await safeDbSave('orders', obj.id, {
        paymentIntentId: obj.id,
        amountTotal: (obj.amount || 0) / 100,
        currency: obj.currency || 'brl',
        paymentStatus: 'paid',
        status: 'paid',
        source: 'stripe_payment_intent',
        paidAt: new Date().toISOString()
      });
      return res.status(200).json({ received: true, status: 'processed' });
    }

    return res.status(200).json({ received: true, unhandledType: event.type });
  } catch (err: any) {
    console.error('[Webhook] Erro ao processar:', err);
    return res.status(500).json({ error: 'Erro ao processar webhook' });
  }
}
