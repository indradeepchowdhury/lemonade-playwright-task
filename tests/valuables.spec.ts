import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { Valuable } from '../pages/sections/ValuablesSection';
import { QUOTE_ID } from '../utils/constants';

test('adding jewelry increases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.valuables.add(Valuable.Jewelry);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('removing jewelry decreases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.valuables.add(Valuable.Jewelry);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
  const priceWithJewelry = await quotePage.getPrice();

  await quotePage.valuables.remove(Valuable.Jewelry);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(priceWithJewelry);
});

test('increasing bicycle coverage raises add premium and quote price by the same amount', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.valuables.openAdd(Valuable.Bicycles);
  const startingAddPremium = await quotePage.valuables.dialog.getAddPremium();

  await quotePage.valuables.dialog.increaseCoverageValue();
  await expect
    .poll(() => quotePage.valuables.dialog.getAddPremium())
    .toBeGreaterThan(startingAddPremium);

  const addPremium = await quotePage.valuables.dialog.getAddPremium();
  await quotePage.valuables.dialog.confirmAdd();

  await expect
    .poll(() => quotePage.getPrice())
    .toBeCloseTo(startingPrice + addPremium, 2);
});
