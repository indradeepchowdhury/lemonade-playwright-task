import { Locator, Page } from '@playwright/test';
import { ActivateInsuranceSection } from './sections/ActivateInsuranceSection';
import { AddOnsSection } from './sections/AddOnsSection';
import { CoverageSection } from './sections/CoverageSection';
import { DeductibleSection } from './sections/DeductibleSection';
import { PaymentPlanSection } from './sections/PaymentPlanSection';
import { ValuablesSection } from './sections/ValuablesSection';

export class QuotePage {
  readonly coverage: CoverageSection;
  readonly valuables: ValuablesSection;
  readonly addOns: AddOnsSection;
  readonly deductible: DeductibleSection;
  readonly paymentPlan: PaymentPlanSection;
  readonly activateInsurance: ActivateInsuranceSection;
  readonly acceptCookiesButton: Locator;
  readonly payButton: Locator;
  readonly payButtons: Locator;

  constructor(private readonly page: Page) {
    this.coverage = new CoverageSection(page);
    this.valuables = new ValuablesSection(page);
    this.addOns = new AddOnsSection(page);
    this.deductible = new DeductibleSection(page);
    this.paymentPlan = new PaymentPlanSection(page);
    this.activateInsurance = new ActivateInsuranceSection(page);
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept all' });
    this.payButton = page.locator('#gtm_button_pay_main');
    this.payButtons = page.getByRole('button', { name: 'Pay' });
  }

  async open(quoteId: string) {
    await this.page.goto(`quotes/${quoteId}`);
    await this.coverage.section.waitFor();

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
