import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { Coverage } from '../pages/sections/CoverageSection';
import { QUOTE_ID } from '../utils/constants';

test('increasing loss of use coverage increases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.coverage.increase(Coverage.LossOfUse);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('decreasing personal property coverage decreases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.coverage.decrease(Coverage.PersonalProperty);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(startingPrice);
});
