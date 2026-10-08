import { test, expect } from '../fixtures/test';

test('quote page loads with all sections and a non-zero price', async ({ quotePage }) => {
  await expect(quotePage.coverage.section).toBeVisible();
  await expect(quotePage.valuables.section).toBeVisible();
  await expect(quotePage.addOns.section).toBeVisible();
  await expect(quotePage.deductible.section).toBeVisible();
  await expect(quotePage.paymentPlan.section).toBeVisible();
  expect(await quotePage.getPrice()).toBeGreaterThan(0);
});
