import { Locator, Page } from '@playwright/test';

export class PersonDialog {
  readonly dialog: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly confirmAddButton: Locator;

  constructor(page: Page) {
    this.dialog = page.locator('dialog');
    this.firstNameInput = this.dialog.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = this.dialog.getByRole('textbox', { name: 'Last name' });
    this.emailInput = this.dialog.getByRole('textbox', { name: 'Email' });
    this.confirmAddButton = this.dialog.getByRole('button', { name: 'Add' });
  }

  async fillPerson(firstName: string, lastName: string, email: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
  }

  async confirmAdd() {
    await this.confirmAddButton.click();
  }
}
