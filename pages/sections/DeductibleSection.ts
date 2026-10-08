import { Locator, Page } from '@playwright/test';

export enum Deductible {
  TwoFifty = '$250',
  FiveHundred = '$500',
  OneThousand = '$1,000',
  TwentyFiveHundred = '$2,500',
}

export class DeductibleSection {
  readonly section: Locator;

  constructor(private readonly page: Page) {
    this.section = page.getByRole('article').filter({
      has: page.getByRole('heading', { name: 'Deductible', exact: true }),
    });
  }

  async select(amount: Deductible) {
    await this.section.scrollIntoViewIfNeeded();
    await this.section.getByTestId('select-header').click();
    await this.page.getByRole('option', { name: amount, exact: true }).click();
  }
}
