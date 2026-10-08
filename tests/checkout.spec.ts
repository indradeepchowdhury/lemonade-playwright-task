import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { QUOTE_ID } from '../utils/constants';

// Checkout is blocked so adding test placeholders but skipping the tests
test.describe.skip('activate insurance checkout', () => {
  test('pay CTA in the payment plan starts checkout', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.open(QUOTE_ID);

    await quotePage.payButton.click();
    // Would assert navigation / checkout UI here.
  });

  test('pay CTA under Activate Your Insurance starts checkout', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.open(QUOTE_ID);

    await quotePage.activateInsurance.scrollIntoView();
    await quotePage.activateInsurance.payButton.click();
    // Would assert navigation / checkout UI here.
  });

  test('all three pay CTAs are present on the quote page', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.open(QUOTE_ID);

    await quotePage.activateInsurance.scrollIntoView();
    await expect(quotePage.payButtons).toHaveCount(3);
  });
});
