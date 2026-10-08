import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { AddOn } from '../pages/sections/AddOnsSection';
import { Coverage } from '../pages/sections/CoverageSection';
import { Valuable } from '../pages/sections/ValuablesSection';
import { randomPerson } from '../utils/person';

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

test('adding a free spouse add-on does not change the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  const person = randomPerson();
  await quotePage.addOns.toggle(AddOn.Spouse);
  await quotePage.addOns.addPerson(person.firstName, person.lastName, person.email);

  await expect.poll(() => quotePage.getPrice()).toBe(startingPrice);
});

test('adding a paid significant other add-on increases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  const person = randomPerson();
  await quotePage.addOns.toggle(AddOn.SignificantOther);
  await quotePage.addOns.addPerson(person.firstName, person.lastName, person.email);

  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});

test('adding water back-up increases the price and removing it decreases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.addOns.toggle(AddOn.WaterBackup);
  await quotePage.addOns.addWaterBackup(false);
  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
  const priceWithAddOn = await quotePage.getPrice();

  await quotePage.addOns.remove(AddOn.WaterBackup);
  await expect.poll(() => quotePage.getPrice()).toBeLessThan(priceWithAddOn);
});

test('adding landlord property damage increases the price', async ({ page }) => {
  const quotePage = new QuotePage(page);

  await quotePage.open(QUOTE_ID);
  const startingPrice = await quotePage.getPrice();

  await quotePage.addOns.toggle(AddOn.LandlordPropertyDamage);
  await quotePage.addOns.addLandlordPropertyDamage(true, false);

  await expect.poll(() => quotePage.getPrice()).toBeGreaterThan(startingPrice);
});
