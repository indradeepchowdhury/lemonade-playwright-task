import { Locator, Page } from '@playwright/test';

export class QuotePage {
  readonly coverageHeading: Locator;
  readonly acceptCookiesButton: Locator;
  readonly payButton: Locator;

  constructor(private readonly page: Page) {
    this.coverageHeading = page.getByRole('heading', { name: 'Coverage Amounts' });
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept all' });
    this.payButton = page.locator('#gtm_button_pay_main');
  }

  async open() {
    await this.page.goto('quotes/LQ42EE07089');
    await this.coverageHeading.waitFor();

    if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
      await this.acceptCookiesButton.click();
    }
  }

  async getPrice(): Promise<number> {
    const text = await this.payButton.innerText();
    const amount = text.split('$')[1].split(' ')[0];
    return Number(amount);
  }
}
