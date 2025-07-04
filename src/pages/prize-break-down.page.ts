import { Locator, Page } from '@playwright/test';

export class PrizeBreakdownPage {
  readonly page: Page;
  readonly breakdownTabLink: Locator;
  readonly winnersCells: Locator;
  readonly totalWinnersElement: Locator;
  readonly prizeTable: Locator;
  readonly prizeTableHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.breakdownTabLink = page.locator('a#prize_breakdown_tab', { hasText: 'Prize breakdown' });
    this.winnersCells = page.locator('table tbody tr td[id*="winners_count"]');
    this.totalWinnersElement = page.locator('#winners_count_total');
    this.prizeTable = page.locator('table');
    this.prizeTableHeader = page.locator('div#prize_breakdown_view table thead tr th');
  }

  async navigateToPrizeBreakdownTabIfNeeded(): Promise<PrizeBreakdownPage> {
    if (await this.breakdownTabLink.isVisible()) {
      await this.breakdownTabLink.click();
    }
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  async calculateTotalWinners(): Promise<number> {
    const rowCount = await this.winnersCells.count();
    let calculatedTotal = 0;

    for (let i = 0; i < rowCount; i++) {
      const text = await this.winnersCells.nth(i).textContent();
      if (text) {
        const cleaned = text.replace(/,/g, '').trim();
        const value = parseInt(cleaned, 10);
        if (!isNaN(value)) {
          calculatedTotal += value;
        }
      }
    }

    return calculatedTotal;
  }

  async getDisplayedTotalWinners(): Promise<number> {
    const totalWinnersText = await this.totalWinnersElement.textContent();
    let displayedTotal = 0;
    
    if (totalWinnersText) {
      const cleanedTotal = totalWinnersText.replace(/,/g, '').trim();
      displayedTotal = parseInt(cleanedTotal, 10);
    }
    
    return displayedTotal;
  }

  async getRowCount(): Promise<number> {
    return await this.winnersCells.count();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isPrizeTableIsVisible(): Promise<boolean> {
    return await this.prizeTable.isVisible();
  }
  async getRawPrizeTableHeaders(): Promise<string[]> {
    const prizeBreakDownHeaders= await this.prizeTableHeader.allTextContents();
    return prizeBreakDownHeaders;
  }
   async getPrizeTableHeader(): Promise<IPrizeBreakdownTable> {
    const headers = await this.getRawPrizeTableHeaders();
    
    // Clean up the header texts
    const cleanHeaders = headers.map(header => header.trim());
    console.log(`Raw Headers: ${JSON.stringify(cleanHeaders)}`);
    
    // Map the headers to our interface properties
    const mappedHeaders: IPrizeBreakdownTable = {
      matches: cleanHeaders[0] || '',
      winners: cleanHeaders[1] || '',
      prize: cleanHeaders[2] || ''
    };
     console.log(`Mapped Headers: ${JSON.stringify(mappedHeaders)}`);
    return mappedHeaders;
  }
}