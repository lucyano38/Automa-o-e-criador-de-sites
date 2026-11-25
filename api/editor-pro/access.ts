import { verifyToken, safeDbGet, OWNER_EMAIL, EDITOR_PRO_LIMIT, isEditorProAccess, usedThisMonth, currentMonthKey } from '../_lib';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Metodo nao permitido' });
  }

  const decoded = await verifyToken(req);
  if (!decoded) return res.status(401).json({ error: 'Autenticacao necessaria' });

  const uid = decoded.uid;
  const isOwner = (decoded.email || '').toLowerCase() === OWNER_EMAIL.toLowerCase();
  const access = await safeDbGet('editorProAccess', uid);
  const active = isEditorProAccess(access, isOwner);
  const used = usedThisMonth(access);

  return res.status(200).json({
    active,
    plan: 'editor-pro',
    limit: EDITOR_PRO_LIMIT,
    used,
    remaining: active ? Math.max(0, EDITOR_PRO_LIMIT - used) : 0,
    isOwner,
    monthKey: currentMonthKey()
  });
}
