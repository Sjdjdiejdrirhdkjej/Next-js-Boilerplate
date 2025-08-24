import arcjet, { shield, tokenBucket } from '@arcjet/next';

// Create a base Arcjet instance which can be imported and extended in each route.
export default arcjet({
  // Get your site key from https://launch.arcjet.com/Q6eLbRE
  // Use `process.env` instead of Env to reduce bundle size in middleware
  key: process.env.ARCJET_KEY ?? '',
  // Identify the user by their IP address
  characteristics: ['ip.src'],
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
    }),
    // Add a rate limit to the Gemini API route.
    // This allows 5 requests per minute.
    tokenBucket({
      mode: 'LIVE',
      characteristics: ['userId'], // Rate limit based on the user's ID
      path: '/api/gemini',
      capacity: 5,
      refillRate: 1,
      interval: 60, // in seconds
    }),
  ],
});
