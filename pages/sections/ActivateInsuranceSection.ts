import { Locator, Page } from '@playwright/test';

export class ActivateInsuranceSection {
  readonly section: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.section = page
      .locator('div')
      .filter({ has: page.getByRole('heading', { name: 'Activate Your Insurance' }) })
      .filter({ has: page.getByRole('button', { name: 'Pay' }) })
      .last();
    this.payButton = this.section.getByRole('button', { name: 'Pay' });
  }

  async scrollIntoView() {
    await this.section.scrollIntoViewIfNeeded();
  }
}
