import { Locator, Page } from '@playwright/test';
import { AddOnsSection } from './sections/AddOnsSection';
import { CoverageSection } from './sections/CoverageSection';
import { ValuablesSection } from './sections/ValuablesSection';

export class QuotePage {
  readonly coverage: CoverageSection;
  readonly valuables: ValuablesSection;
  readonly addOns: AddOnsSection;
  readonly coverageHeading: Locator;
  readonly acceptCookiesButton: Locator;
  readonly payButton: Locator;

  constructor(private readonly page: Page) {
    this.coverage = new CoverageSection(page);
    this.valuables = new ValuablesSection(page);
    this.addOns = new AddOnsSection(page);
    this.coverageHeading = page.getByRole('heading', { name: 'Coverage Amounts' });
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept all' });
    this.payButton = page.locator('#gtm_button_pay_main');
  }

  async open(quoteId: string) {
    await this.page.goto(`quotes/${quoteId}`);
    await this.coverageHeading.waitFor();

    // Clear the cookie banner if it is visible
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
