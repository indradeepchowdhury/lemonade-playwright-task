import { Locator, Page } from '@playwright/test';

export enum Deductible {
  TwoFifty = '$250',
  FiveHundred = '$500',
  OneThousand = '$1,000',
  TwentyFiveHundred = '$2,500',
}

export class DeductibleSection {
  constructor(private readonly page: Page) {}

  private card(): Locator {
    return this.page.getByRole('article').filter({
      has: this.page.getByRole('heading', { name: 'Deductible', exact: true }),
    });
  }

  async select(amount: Deductible) {
    const card = this.card();
    await card.scrollIntoViewIfNeeded();
    await card.getByTestId('select-header').click();
    await this.page.getByRole('option', { name: amount, exact: true }).click();
  }
}
