import { Coverage } from '../pages/sections/CoverageSection';
import { test, expect } from '../fixtures/test';

test('increasing loss of use coverage increases the price', async ({ quotePage }) => {
  const startingPrice = await quotePage.getPrice();

  await quotePage.coverage.increase(Coverage.LossOfUse);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('decreasing personal property coverage decreases the price', async ({ quotePage }) => {
  const startingPrice = await quotePage.getPrice();

  await quotePage.coverage.decrease(Coverage.PersonalProperty);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(startingPrice);
});
