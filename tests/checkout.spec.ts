import { test, expect } from '../fixtures/test';

// Checkout is blocked so adding test placeholders but skipping the tests
test.describe.skip('activate insurance checkout', () => {
  test('pay CTA in the payment plan starts checkout', async ({ quotePage }) => {
    await quotePage.payButton.click();
    // Would assert navigation / checkout UI here.
  });

  test('pay CTA under Activate Your Insurance starts checkout', async ({ quotePage }) => {
    await quotePage.activateInsurance.scrollIntoView();
    await quotePage.activateInsurance.payButton.click();
    // Would assert navigation / checkout UI here.
  });

  test('all three pay CTAs are present on the quote page', async ({ quotePage }) => {
    await quotePage.activateInsurance.scrollIntoView();
    await expect(quotePage.payButtons).toHaveCount(3);
  });
});
