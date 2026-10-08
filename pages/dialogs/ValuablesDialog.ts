import { Locator, Page } from '@playwright/test';

export class ValuablesDialog {
  readonly dialog: Locator;
  readonly increaseButton: Locator;
  readonly confirmAddButton: Locator;
  readonly gotItButton: Locator;
  readonly confirmYesButton: Locator;

  constructor(page: Page) {
    this.dialog = page.locator('dialog');
    this.increaseButton = this.dialog.getByLabel('increase');
    this.confirmAddButton = this.dialog.getByRole('button', { name: 'Add' });
    this.gotItButton = this.dialog.getByRole('button', { name: 'Got it' });
    this.confirmYesButton = page.getByRole('button', { name: 'Yes' });
  }

  async increaseCoverageValue() {
    await this.increaseButton.click();
  }

  async getAddPremium(): Promise<number> {
    const text = await this.confirmAddButton.innerText();
    const amount = text.split('$')[1].split(')')[0];
    return Number(amount);
  }

  async confirmAdd() {
    await this.confirmAddButton.click();

    if (await this.gotItButton.isVisible().catch(() => false)) {
      await this.gotItButton.click();
    }
  }

  async confirmYes() {
    await this.confirmYesButton.click();
  }
}
