import { Locator, Page } from '@playwright/test';
import { LandlordPropertyDamageDialog } from '../dialogs/addons/LandlordPropertyDamageDialog';
import { PersonDialog } from '../dialogs/addons/PersonDialog';
import { WaterBackupDialog } from '../dialogs/addons/WaterBackupDialog';

export enum AddOn {
  Spouse = 'addon-secondary_insured',
  SignificantOther = 'addon-other_members_of_household',
  WaterBackup = 'addon-water_backup',
  LandlordPropertyDamage = 'addon-landlord_property_damage',
}

export class AddOnsSection {
  readonly person: PersonDialog;
  readonly waterBackup: WaterBackupDialog;
  readonly landlordPropertyDamage: LandlordPropertyDamageDialog;

  constructor(private readonly page: Page) {
    this.person = new PersonDialog(page);
    this.waterBackup = new WaterBackupDialog(page);
    this.landlordPropertyDamage = new LandlordPropertyDamageDialog(page);
  }

  private card(addOn: AddOn): Locator {
    return this.page.locator(`#${addOn}`);
  }

  async toggle(addOn: AddOn) {
    const card = this.card(addOn);
    await card.scrollIntoViewIfNeeded();
    await card.getByText('Toggle', { exact: true }).click();
  }

  async remove(addOn: AddOn) {
    await this.toggle(addOn);
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }

  async addPerson(firstName: string, lastName: string, email: string) {
    await this.person.fillPerson(firstName, lastName, email);
    await this.person.confirmAdd();
  }

  async addWaterBackup(livesOnFirstFloor = false) {
    await this.waterBackup.selectLivesOnFirstFloor(livesOnFirstFloor);
    await this.waterBackup.confirmAdd();
  }

  async addLandlordPropertyDamage(tenantWaterDamage = true, tenantPetDamage = false) {
    await this.landlordPropertyDamage.selectCoverages(tenantWaterDamage, tenantPetDamage);
    await this.landlordPropertyDamage.confirmAdd();
  }
}
