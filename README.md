# Lemonade quote page tests

This repo is the Playwright test suite for the Lemonade quote page:

https://lemonade-hq.github.io/qa-interview-task/quotes/LQ42EE07089

It covers tests for all the sections on the page. The tests for the checkout functionality are intentionally skipped as that flow is blocked on this environment.

## Test cases covered

- Smoke: page loads with all sections and has a non zero price
- Coverage section: increase and decrease coverage amounts and check price changes
- Valuables section: add and remove jewelry, bicycle coverage and check price changes
- Add-ons section: spouse (free), significant other, water back-up, landlord property damage tests
- Deductible section: decrease and increase the deductible and check price impact
- Payment plan section: verify annual discount math and start date changes
- Checkout logic: verify checkout logic, but currently just a placeholder because environment does not support

## Setup

Needs Node `22.18.0` (see `.nvmrc`).

```bash
nvm use
npm install
npx playwright install
```

## Running tests

```bash
# all browsers, headless by default
npm test
# or
npx playwright test

# Chrome
npm run test:chromium
# or
npx playwright test --project=chromium

# Firefox
npm run test:firefox
# or
npx playwright test --project=firefox

# Webkit
npm run test:webkit
# or
npx playwright test --project=webkit

# Headed mode
npm run test:headed
# or
npx playwright test --headed

# Headed mode on Chrome
npm run test:chromium:headed
# or
npx playwright test --project=chromium --headed
```

Note: The quote page doesn't currently load on WebKit.

## Reports

After a run locally:

```bash
# Playwright's built-in HTML report
npm run report
# or
npx playwright show-report

# Allure report
npm run allure:generate
npm run allure:open
# or generate and open in one go
npm run allure:serve
```

## CI

GitHub Actions runs on every push.

Download the `playwright-report` artifact from the Actions run, unzip it, and open `index.html`.

Currently the workflow runs the tests only on Chrome.

## Structure

- `pages/` — page objects (quote page + sections + dialogs)
- `tests/` — one spec file per feature
- `fixtures/` — shared test setup
- `utils/` — helpers and fakers
