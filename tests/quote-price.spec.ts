import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { Coverage } from '../pages/sections/CoverageSection';
import { Valuable } from '../pages/sections/ValuablesSection';

// Quote ID for this exercise
const QUOTE_ID = 'LQ42EE07089';

test('quote page loads with a non-zero price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const price = await quotePage.getPrice();

  expect(price).toBeGreaterThan(0);
});

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
