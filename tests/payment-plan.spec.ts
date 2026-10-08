import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { ANNUAL_DISCOUNT, BillingPeriod } from '../pages/sections/PaymentPlanSection';
import { QUOTE_ID } from '../utils/constants';

test('annual billing equals twelve months minus the advertised discount', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const monthlyPrice = await quotePage.getPrice();

  await quotePage.paymentPlan.select(BillingPeriod.Annual);

  await expect
    .poll(() => quotePage.getPrice())
    .toBeCloseTo(monthlyPrice * 12 - ANNUAL_DISCOUNT, 2);
  await expect(quotePage.payButton).toContainText('/ year');
});

test('changing the start date updates the selected value', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const previous = await quotePage.paymentPlan.startDate.innerText();

  await quotePage.paymentPlan.changeStartDate();
  await expect(quotePage.paymentPlan.startDate).not.toHaveText(previous);
});
