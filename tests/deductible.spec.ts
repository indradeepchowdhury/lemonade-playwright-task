import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { Deductible } from '../pages/sections/DeductibleSection';
import { QUOTE_ID } from '../utils/constants';

test('decreasing the deductible increases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.deductible.select(Deductible.TwoFifty);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('increasing the deductible decreases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.deductible.select(Deductible.OneThousand);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(startingPrice);
});
