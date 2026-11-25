import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import Stripe from 'stripe';

/**
 * Biblioteca compartilhada das funcoes serverless do Editor Pro.
 * Arquivos com "_" no inicio nao sao expostos como funcoes pela Vercel.
 */

export const OWNER_EMAIL = 'lucyano.pci@gmail.com';
export const EDITOR_PRO_LIMIT = 5;

function initFirebaseAdmin() {
  if (getApps().length) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    try {
      const sa = JSON.parse(raw);
      initializeApp({ credential: cert(sa), projectId: sa.project_id });
      return;
    } catch (err) {
      console.error('[Editor Pro] FIREBASE_SERVICE_ACCOUNT invalida:', err);
    }
  }
  // Sem service account, a verificacao de token ainda funciona (chaves publicas do Google).
  initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
}

initFirebaseAdmin();

export const db = getFirestore();
export const adminAuth = getAuth();

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  return key && key.startsWith('sk_') ? new Stripe(key) : null;
}

export async function safeDbSave(collection: string, docId: string, data: any) {
  try {
    await db.collection(collection).doc(docId).set(data, { merge: true });
  } catch (err: any) {
    console.warn(`[Editor Pro] Falha ao salvar ${collection}/${docId}:`, err?.message || err);
  }
}

export async function safeDbGet(collection: string, docId: string): Promise<any | null> {
  try {
    const doc = await db.collection(collection).doc(docId).get();
    if (doc.exists) return doc.data();
  } catch (err: any) {
    console.warn(`[Editor Pro] Falha ao ler ${collection}/${docId}:`, err?.message || err);
  }
  return null;
}

export async function verifyToken(req: any) {
  const raw = req.headers?.authorization || req.headers?.['x-foco-id-token'];
  const token = typeof raw === 'string' ? raw.replace(/^Bearer\s+/i, '') : '';
  if (!token) return null;
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (err: any) {
    console.warn('[Editor Pro] Token invalido:', err?.message || err);
    return null;
  }
}

export function currentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

export function isEditorProAccess(access: any, isOwner: boolean) {
  const periodValid = !access?.currentPeriodEnd || new Date(access.currentPeriodEnd).getTime() > Date.now();
  return isOwner || (access?.status === 'active' && periodValid);
}

export function usedThisMonth(access: any) {
  return access?.monthKey === currentMonthKey() ? Number(access.videosUsed || 0) : 0;
}
