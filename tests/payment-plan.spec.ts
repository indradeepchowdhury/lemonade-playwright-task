import { ANNUAL_DISCOUNT, BillingPeriod } from '../pages/sections/PaymentPlanSection';
import { test, expect } from '../fixtures/test';

test('annual billing equals twelve months minus the advertised discount', async ({ quotePage }) => {
  const monthlyPrice = await quotePage.getPrice();

  await quotePage.paymentPlan.select(BillingPeriod.Annual);

  await expect
    .poll(() => quotePage.getPrice())
    .toBeCloseTo(monthlyPrice * 12 - ANNUAL_DISCOUNT, 2);
  await expect(quotePage.payButton).toContainText('/ year');
});

test('changing the start date updates the selected value', async ({ quotePage }) => {
  const previous = await quotePage.paymentPlan.startDate.innerText();

  await quotePage.paymentPlan.changeStartDate();
  await expect(quotePage.paymentPlan.startDate).not.toHaveText(previous);
});
