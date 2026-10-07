import { Locator, Page } from '@playwright/test';

export enum Coverage {
  PersonalProperty = 'PERSONAL PROPERTY',
  LossOfUse = 'LOSS OF USE',
}

export class CoverageSection {
  constructor(private readonly page: Page) {}

  private coverageCard(coverage: Coverage): Locator {
    return this.page
      .locator('div')
      .filter({ has: this.page.getByRole('heading', { name: coverage }) })
      .last();
  }

  async increase(coverage: Coverage) {
    await this.coverageCard(coverage).getByLabel('increase').click();
  }

  async decrease(coverage: Coverage) {
    await this.coverageCard(coverage).getByLabel('decrease').click();
  }
}
