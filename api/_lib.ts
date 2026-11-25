/**
 * Biblioteca compartilhada das funcoes serverless do Editor Pro.
 * Arquivos com "_" no inicio nao sao expostos como funcoes pela Vercel.
 * Os imports do Firebase Admin e do Stripe sao feitos sob demanda para
 * que um problema de credencial nao derrube o carregamento do modulo.
 */

export const OWNER_EMAIL = 'lucyano.pci@gmail.com';
export const EDITOR_PRO_LIMIT = 5;

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'appcuidador-23628';

let authClient: any = null;
let getFirestoreFn: any = null;
let firestore: any = null;
let stripeCtor: any = null;

async function ensureFirebase() {
  if (authClient) return;
  const { initializeApp, cert, getApps } = await import('firebase-admin/app');
  const { getAuth } = await import('firebase-admin/auth');
  const { getFirestore } = await import('firebase-admin/firestore');

  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (raw) {
      try {
        const sa = JSON.parse(raw);
        initializeApp({ credential: cert(sa), projectId: sa.project_id || PROJECT_ID });
      } catch (err: any) {
        console.error('[Editor Pro] FIREBASE_SERVICE_ACCOUNT invalida:', err?.message || err);
        initializeApp({ projectId: PROJECT_ID });
      }
    } else {
      initializeApp({ projectId: PROJECT_ID });
    }
  }

  authClient = getAuth();
  getFirestoreFn = getFirestore;
}

export async function getStripeAsync(): Promise<any | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !key.startsWith('sk_')) return null;
  if (!stripeCtor) {
    const mod = await import('stripe');
    stripeCtor = (mod as any).default || mod;
  }
  return new stripeCtor(key);
}

export async function safeDbSave(collection: string, docId: string, data: any) {
  try {
    await ensureFirebase();
    if (!firestore) firestore = getFirestoreFn();
    await firestore.collection(collection).doc(docId).set(data, { merge: true });
  } catch (err: any) {
    console.warn(`[Editor Pro] Falha ao salvar ${collection}/${docId}:`, err?.message || err);
  }
}

export async function safeDbGet(collection: string, docId: string): Promise<any | null> {
  try {
    await ensureFirebase();
    if (!firestore) firestore = getFirestoreFn();
    const doc = await firestore.collection(collection).doc(docId).get();
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
    await ensureFirebase();
    return await authClient.verifyIdToken(token);
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
