import { Locator, Page } from '@playwright/test';

export enum LandlordCoverage {
  TenantWaterDamage = 'tenantWaterDamage',
  TenantPetDamage = 'tenantPetDamage',
}

export class LandlordPropertyDamageDialog {
  readonly dialog: Locator;
  readonly confirmAddButton: Locator;

  constructor(page: Page) {
    this.dialog = page.locator('dialog');
    this.confirmAddButton = this.dialog.getByRole('button', { name: 'Add' });
  }

  async selectCoverages(tenantWaterDamage: boolean, tenantPetDamage: boolean) {
    const water = this.dialog.locator(`#${LandlordCoverage.TenantWaterDamage}`);
    const pet = this.dialog.locator(`#${LandlordCoverage.TenantPetDamage}`);

    if (tenantWaterDamage) {
      await water.check();
    } else {
      await water.uncheck();
    }

    if (tenantPetDamage) {
      await pet.check();
    } else {
      await pet.uncheck();
    }
  }

  async confirmAdd() {
    await this.confirmAddButton.click();
  }
}
