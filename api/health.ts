export default function handler(req: any, res: any) {
  res.status(200).json({
    ok: true,
    node: process.version,
    hasProjectId: Boolean(process.env.FIREBASE_PROJECT_ID),
    hasServiceAccount: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT),
    hasStripe: Boolean(process.env.STRIPE_SECRET_KEY)
  });
}
