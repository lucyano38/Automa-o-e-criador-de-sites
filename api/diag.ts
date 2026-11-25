import { verifyToken } from './_lib';

export default async function handler(req: any, res: any) {
  const result = await verifyToken({ headers: {} });
  res.status(200).json({ ok: true, noTokenRejected: result === null });
}
