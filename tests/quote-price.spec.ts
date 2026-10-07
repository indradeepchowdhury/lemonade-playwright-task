import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';

test('quote page loads with a non-zero price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open();
  const price = await quotePage.getPrice();

  expect(price).toBeGreaterThan(0);
});
