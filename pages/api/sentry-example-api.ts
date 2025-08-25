import { NextApiRequest, NextApiResponse } from 'next';

// Custom error class for Sentry demonstration purposes
class SentryExampleAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SentryExampleAPIError';
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is an intentional error for Sentry testing/demonstration
  throw new SentryExampleAPIError('This error is raised on the backend called by the example page.');
}