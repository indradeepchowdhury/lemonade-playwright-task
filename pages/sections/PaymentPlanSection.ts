import { Locator, Page } from '@playwright/test';

export const ANNUAL_DISCOUNT = 12;

export enum BillingPeriod {
  Monthly = 'MONTHLY',
  Annual = `ANNUAL (-$${ANNUAL_DISCOUNT})`,
}

export class PaymentPlanSection {
  readonly section: Locator;

  constructor(private readonly page: Page) {
    this.section = page
      .locator('div')
      .filter({ has: page.locator('#MONTHLY') })
      .filter({ has: page.locator('#gtm_button_pay_main') })
      .last();
  }

  async select(period: BillingPeriod) {
    await this.page.getByText(period, { exact: true }).click();
  }
}
