# Edge Water Market

This project contains Playwright tests for the Edge Water Market application. The tests are written in TypeScript and use the Page Object Model pattern to validate functionality on the National Lottery website.

## Project Structure

- `src/`: Contains application components
  - `pages/`: Page Object Models for website pages
  - `models/`: Data interfaces and model definitions
  - `utils/`: Utility functions and helpers
  - `base/`: Base test setup and fixtures
- `tests/`: Contains test specification files
- `playwright.config.ts`: Configuration file for Playwright
- `package.json`: Project dependencies and scripts

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd edge-water-market
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install recommended VS Code extensions:

  **Env Switcher**
   - Allows you to switch between different environments easily
   - [Install Env Switcher](https://marketplace.visualstudio.com/items?itemName=ZainChen.env-switcher)

   **Playwright Test for VS Code**
   - Provides a UI to view and execute Playwright tests
   - [Install Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Running Tests

### Using Command Line:

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/all-winner.spec.ts

# Run tests with UI mode
npx playwright test --ui
```

### Using VS Code:

1. Ensure Playwright Test for VS Code is installed
2. Select your environment preset using the Env Switcher
3. Open the Testing panel (beaker icon) in the Activity Bar
4. Run tests using the play button next to each test
5. Alternatively, use the play button directly in test spec files

## Architecture

This project implements the Page Object Model (POM) pattern with:

- **Object Chaining**: Methods return page objects for fluent method chaining
- **Base Test Pattern**: Centralized page object initialization through fixtures
- **Event Handling**: Robust handling of page events and dialogs
- **Data Models**: Structured interfaces for working with page data

## Test Overview

The tests validate critical functionality on the National Lottery website:
- Navigation through the site's main sections
- Checking lottery results and prize breakdowns
- Verifying winner counts and prize calculations

## Reporting

Test reports are automatically generated and can be viewed by opening the HTML report after test execution:

```bash
npx playwright show-report
```

Changes







