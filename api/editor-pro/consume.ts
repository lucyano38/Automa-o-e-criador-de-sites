import { verifyToken, safeDbGet, safeDbSave, OWNER_EMAIL, EDITOR_PRO_LIMIT, isEditorProAccess, usedThisMonth, currentMonthKey } from '../_lib';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo nao permitido', allowed: false });
  }

  const decoded = await verifyToken(req);
  if (!decoded) return res.status(401).json({ error: 'Autenticacao necessaria', allowed: false });

  const uid = decoded.uid;
  const isOwner = (decoded.email || '').toLowerCase() === OWNER_EMAIL.toLowerCase();
  const access = await safeDbGet('editorProAccess', uid);
  if (!isEditorProAccess(access, isOwner)) {
    return res.status(403).json({ error: 'Assinatura Editor Pro inativa', allowed: false });
  }

  const monthKey = currentMonthKey();
  const used = usedThisMonth(access);
  if (used >= EDITOR_PRO_LIMIT) {
    return res.status(403).json({ error: 'Limite de 5 videos atingido neste mes', allowed: false, remaining: 0 });
  }

  await safeDbSave('editorProAccess', uid, {
    userId: uid,
    email: decoded.email || '',
    plan: 'editor-pro',
    status: access?.status || 'active',
    monthKey,
    videosUsed: used + 1,
    updatedAt: new Date().toISOString()
  });

  return res.status(200).json({
    allowed: true,
    used: used + 1,
    remaining: Math.max(0, EDITOR_PRO_LIMIT - used - 1)
  });
}
