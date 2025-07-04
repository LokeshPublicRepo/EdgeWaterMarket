import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ResultsPage } from '../pages/results.page';    
import { DrawHistoryPage } from '../pages/draw-history.page';
import { PrizeBreakdownPage } from '../pages/prize-break-down.page'

type Pages = {
  homePage: HomePage;
  resultsPage: ResultsPage;
  drawHistoryPage: DrawHistoryPage;
  prizeBreakdownPage: PrizeBreakdownPage;
};

// Create a fixture that instantiates all page objects
export const test = baseTest.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },
  drawHistoryPage: async ({ page }, use) => {
    await use(new DrawHistoryPage(page));
  },
  prizeBreakdownPage: async ({ page }, use) => {
    await use(new PrizeBreakdownPage(page));
  },
});

// Re-export expect for convenience
export { expect } from '@playwright/test';