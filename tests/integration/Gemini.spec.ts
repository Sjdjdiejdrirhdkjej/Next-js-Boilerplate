import { expect, test } from '@playwright/test';

test.describe('Gemini API', () => {
  test('should return 401 when calling the Gemini API without authentication', async ({
    page,
  }) => {
    const response = await page.request.post('/api/gemini', {
      data: {
        prompt: 'Hello',
      },
    });

    // When the Clerk middleware is properly configured with a secret key,
    // it should return a 401 Unauthorized status for unauthenticated API requests.
    expect(response.status()).toBe(401);
  });

  test.skip('should return a successful response from the Gemini API', async ({
    page,
  }) => {
    // This test is skipped because it requires a valid session cookie.
    // You can run this test by first authenticating in the browser and then running the test.
    // You will also need to provide a valid GEMINI_API_KEY in your .env file.
    const response = await page.request.post('/api/gemini', {
      data: {
        prompt: 'Hello',
      },
    });

    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json).toHaveProperty('text');
  });
});
