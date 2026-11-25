import { adminAuth } from './_lib';

export default function handler(req: any, res: any) {
  res.status(200).json({ ok: true, hasAdminAuth: Boolean(adminAuth) });
}
