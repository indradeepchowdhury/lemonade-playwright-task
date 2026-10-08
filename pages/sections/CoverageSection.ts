import { Locator, Page } from '@playwright/test';

export enum Coverage {
  PersonalProperty = 'PERSONAL PROPERTY',
  LossOfUse = 'LOSS OF USE',
}

export class CoverageSection {
  readonly section: Locator;

  constructor(private readonly page: Page) {
    this.section = page
      .locator('div')
      .filter({ has: page.getByRole('heading', { name: 'Coverage Amounts' }) })
      .last();
  }

  private card(coverage: Coverage): Locator {
    return this.page
      .locator('div')
      .filter({ has: this.page.getByRole('heading', { name: coverage }) })
      .last();
  }

  async increase(coverage: Coverage) {
    await this.card(coverage).getByLabel('increase').click();
  }

  async decrease(coverage: Coverage) {
    await this.card(coverage).getByLabel('decrease').click();
  }
}
