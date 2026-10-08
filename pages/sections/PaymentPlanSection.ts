import { Locator, Page } from '@playwright/test';

export const ANNUAL_DISCOUNT = 12;

export enum BillingPeriod {
  Monthly = 'MONTHLY',
  Annual = `ANNUAL (-$${ANNUAL_DISCOUNT})`,
}

export class PaymentPlanSection {
  readonly section: Locator;
  readonly startDate: Locator;

  constructor(private readonly page: Page) {
    this.section = page
      .locator('div')
      .filter({ has: page.locator('#MONTHLY') })
      .filter({ has: page.locator('#gtm_button_pay_main') })
      .last();
    this.startDate = this.section.getByTestId('select-header');
  }

  async select(period: BillingPeriod) {
    await this.page.getByText(period, { exact: true }).click();
  }

  async changeStartDate() {
    const year = (await this.startDate.innerText()).split('/')[2];
    await this.startDate.click();

    const days = this.page.getByRole('button', { name: year });
    await days.nth(Math.floor(Math.random() * (await days.count()))).click();
  }
}
