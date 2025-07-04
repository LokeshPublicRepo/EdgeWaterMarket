
import { getBaseURL } from '../src/utils/env-loader.utils';
import { test } from '../src/fixtures/base.fixture';
import { expect } from '@playwright/test';
import { IPrizeBreakdownTable } from '../src/models/prize-breakdown.model';

/**
 * Test to validate the National Lottery prize breakdown functionality using Page Object Model
 * 
 * Using Object Chaining and Base Test Class pattern:
 * - Arrange: Set up and navigate using method chaining for fluent API
 * - Act: Extract data and calculate totals
 * - Assert: Verify the calculations and page content
 */

test('Verify All Winners Total aggregated correctly', 
  async ({ homePage, resultsPage, drawHistoryPage, prizeBreakdownPage }) => {
    const baseURL = getBaseURL();
     const expectedPrizeTableHeaders:IPrizeBreakdownTable= {
      matches: 'No. of matches',
      winners: 'All winners',
      prize: 'Prize per winner'
    };
  
    // ARRANGE - Using method chaining for a fluent API
    await homePage
      .navigateTo(baseURL)
      .then(page => page.acceptCookiesIfPresent())
      .then(page => page.clickResultsTab())
      .then(page => page.clickSeeAllResultsIfPresent(baseURL));
      
    // Navigate to Draw History and Prize Breakdown    
    await resultsPage.clickDrawHistory();
    const drawDateText = await drawHistoryPage.clickFirstPrizeBreakdown();
    await prizeBreakdownPage.navigateToPrizeBreakdownTabIfNeeded();

    // ACT - Extract and calculate values
    const calculatedTotal = await prizeBreakdownPage.calculateTotalWinners();  
    const displayedTotal = await prizeBreakdownPage.getDisplayedTotalWinners();
    const actualPageTitle = await prizeBreakdownPage.getPageTitle();
    const isPrizeTableIsVisible = await prizeBreakdownPage.isPrizeTableIsVisible();
    const rowCount = await prizeBreakdownPage.getRowCount();   
    const prizeTableHeader = await prizeBreakdownPage.getPrizeTableHeader();
    console.log(`Prize Table Header: ${JSON.stringify(prizeTableHeader)}`);

    // ASSERT - Verify all conditions are met
    expect(calculatedTotal).toBe(displayedTotal);
    expect(actualPageTitle).toContain("Lotto prize breakdown | Results | The National Lottery");
    expect(drawDateText).toBeDefined(); 
    expect(isPrizeTableIsVisible).toBeTruthy();  
    expect(calculatedTotal).toBeGreaterThan(0);   
    expect(rowCount).toBeGreaterThanOrEqual(3);    
    expect(prizeTableHeader).toBeTruthy();
    expect(prizeTableHeader.matches).toBe(expectedPrizeTableHeaders.matches);
    expect(prizeTableHeader.winners).toBe(expectedPrizeTableHeaders.winners); 
    expect(prizeTableHeader.prize).toBe(expectedPrizeTableHeaders.prize);        
   
});