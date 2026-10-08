import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { AddOn } from '../pages/sections/AddOnsSection';
import { QUOTE_ID } from '../utils/constants';
import { randomPerson } from '../utils/person';

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
