import { Locator, Page, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;
  readonly lottoDrawHistoryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lottoDrawHistoryLink = page.locator('a[href*="/results/lotto/draw-history"]').first();

  }

  async clickDrawHistory(): Promise<ResultsPage> {
    await this.lottoDrawHistoryLink.click();
    await expect(this.page).toHaveURL(/.*draw-history.*/);
    return this;
  }
}