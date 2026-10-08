import { test as base } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { QUOTE_ID } from '../utils/constants';

export const test = base.extend<{ quotePage: QuotePage }>({
  quotePage: async ({ page }, use) => {
    const quotePage = new QuotePage(page);
    await quotePage.open(QUOTE_ID);
    await use(quotePage);
  },
});

export { expect } from '@playwright/test';
