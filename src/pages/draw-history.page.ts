import { Locator, Page } from '@playwright/test';

export class DrawHistoryPage {
  readonly page: Page;
  readonly firstPrizeBreakdownLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstPrizeBreakdownLink = page.locator('#draw_history_lotto ul li li div a[id*="prize_breakdown"]').first();
  }

  async clickFirstPrizeBreakdown(): Promise<string | null> {
    const drawDateText = await this.firstPrizeBreakdownLink.textContent();
    await this.firstPrizeBreakdownLink.click();
    return drawDateText;
  }
}