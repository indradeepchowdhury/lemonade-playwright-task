import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { QUOTE_ID } from '../utils/constants';

test('quote page loads with all sections and a non-zero price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);

  await expect(quotePage.coverage.section).toBeVisible();
  await expect(quotePage.valuables.section).toBeVisible();
  await expect(quotePage.addOns.section).toBeVisible();
  await expect(quotePage.deductible.section).toBeVisible();
  await expect(quotePage.paymentPlan.section).toBeVisible();
  expect(await quotePage.getPrice()).toBeGreaterThan(0);
});
