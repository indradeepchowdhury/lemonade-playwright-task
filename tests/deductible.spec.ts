import { Deductible } from '../pages/sections/DeductibleSection';
import { test, expect } from '../fixtures/test';

test('decreasing the deductible increases the price', async ({ quotePage }) => {
  const startingPrice = await quotePage.getPrice();

  await quotePage.deductible.select(Deductible.TwoFifty);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('increasing the deductible decreases the price', async ({ quotePage }) => {
  const startingPrice = await quotePage.getPrice();

  await quotePage.deductible.select(Deductible.OneThousand);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(startingPrice);
});
