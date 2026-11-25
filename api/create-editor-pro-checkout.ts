import { getStripeAsync, safeDbSave } from './_lib';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const { customerEmail, customerName, userId } = req.body || {};
  const stripe = await getStripeAsync();
  const origin = req.headers?.origin || process.env.APP_URL || 'https://focoemdados.com.br';

  if (!stripe) {
    return res.status(200).json({
      mode: 'gateway_ready',
      isStripeConfigured: false,
      priceInCents: 2990,
      priceFormatted: (29.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      message: 'Configure STRIPE_SECRET_KEY para ativar a assinatura do Editor Pro.'
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'brl',
          recurring: { interval: 'month' },
          product_data: {
            name: 'Editor Pro - Foco em Dados',
            description: 'Edicao automatica de ate 5 videos por mes (cortes, banners por assunto e efeitos).'
          },
          unit_amount: 2990
        },
        quantity: 1
      }],
      success_url: `${origin}/editor-pro?checkout_status=success&session_id={CHECKOUT_SESSION_ID}&service=editor-pro`,
      cancel_url: `${origin}/editor-pro?checkout_status=cancelled&service=editor-pro`,
      customer_email: customerEmail || undefined,
      client_reference_id: userId || 'guest',
      metadata: {
        plan: 'editor-pro',
        serviceId: 'editor-pro',
        serviceTitle: 'Editor Pro - ate 5 videos/mes',
        customerEmail: customerEmail || '',
        customerName: customerName || '',
        userId: userId || ''
      }
    });

    if (userId && userId !== 'guest') {
      await safeDbSave('editorProAccess', userId, {
        userId,
        email: customerEmail || '',
        plan: 'editor-pro',
        status: 'pending',
        checkoutSessionId: session.id,
        updatedAt: new Date().toISOString()
      });
    }

    return res.status(200).json({ id: session.id, url: session.url, mode: 'live_stripe' });
  } catch (err: any) {
    console.error('[Editor Pro] Erro no checkout:', err);
    return res.status(500).json({ error: 'Erro ao criar assinatura Editor Pro: ' + (err?.message || err) });
  }
}
