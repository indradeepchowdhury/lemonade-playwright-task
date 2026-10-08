# Lemonade quote page tests

This repo is the Playwright test suite for the Lemonade quote page:

https://lemonade-hq.github.io/qa-interview-task/quotes/LQ42EE07089

It covers tests for all the sections on the page. The tests for the checkout functionality are intentionally skipped as that flow is blocked on this environment.

## Test cases covered

- Smoke: page loads with all sections and a non-zero price
- Coverage: increase / decrease coverage amounts and check price
- Valuables: add / remove jewelry, bicycle coverage vs add premium
- Add-ons: spouse (free), significant other, water back-up, landlord property damage
- Deductible: lower / higher deductible and price impact
- Payment plan: annual discount math, start date change
- Checkout: placeholders only (skipped)

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

# one particular browser, headless mode
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
# headed
npx playwright test --project=firefox --headed
```

Note: The quote page doesn't currently load on WebKit.

## Reports

After a run:

```bash
# Playwright's built-in HTML report
npx playwright show-report

# Allure report
npm run allure:generate
npm run allure:open
```

## Structure

- `pages/` — page objects (quote page + sections + dialogs)
- `tests/` — one spec file per feature
- `fixtures/` — shared test setup
- `utils/` — helpers and fakers
