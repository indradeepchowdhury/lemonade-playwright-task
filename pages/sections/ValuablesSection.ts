import { Locator, Page } from '@playwright/test';
import { ValuablesDialog } from '../dialogs/ValuablesDialog';

export enum Valuable {
  Jewelry = 'jewelry',
  Bicycles = 'bicycles',
}

export class ValuablesSection {
  readonly dialog: ValuablesDialog;

  constructor(private readonly page: Page) {
    this.dialog = new ValuablesDialog(page);
  }

  private card(valuable: Valuable): Locator {
    return this.page.locator(`[aria-label="${valuable}"]`);
  }

  async openAdd(valuable: Valuable) {
    await this.card(valuable).getByLabel('add').click();
  }

  async add(valuable: Valuable) {
    await this.openAdd(valuable);
    await this.dialog.confirmAdd();
  }

  async remove(valuable: Valuable) {
    await this.card(valuable).getByLabel('delete').click();
    await this.dialog.confirmYes();
  }
}
