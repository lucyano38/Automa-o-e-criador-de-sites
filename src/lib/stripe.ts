import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(((import.meta as unknown as { env: Record<string, string> }).env?.VITE_STRIPE_PUBLIC_KEY) || '');

export default stripePromise;
