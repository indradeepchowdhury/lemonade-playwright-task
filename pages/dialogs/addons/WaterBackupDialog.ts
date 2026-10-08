import { Locator, Page } from '@playwright/test';

export class WaterBackupDialog {
  readonly dialog: Locator;
  readonly increaseButton: Locator;
  readonly confirmAddButton: Locator;

  constructor(page: Page) {
    this.dialog = page.locator('dialog');
    this.increaseButton = this.dialog.getByLabel('increase');
    this.confirmAddButton = this.dialog.getByRole('button', { name: 'Add' });
  }

  async selectLivesOnFirstFloor(livesOnFirstFloor: boolean) {
    await this.dialog.getByText(livesOnFirstFloor ? 'Yes' : 'No', { exact: true }).click();
  }

  async confirmAdd() {
    await this.confirmAddButton.click();
  }
}
