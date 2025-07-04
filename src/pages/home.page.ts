import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly resultsTab: Locator;
  readonly seeAllResultsButton: Locator;
  readonly resultsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('a.cuk_btn.cuk_btn_primary.cuk_cookie_consent_accept_all').first();
    this.resultsTab = page.locator('#nav_main_results');
    this.seeAllResultsButton = page.locator('#nav_container_desktop_results a:has-text("See all results")');
    this.resultsContainer = page.locator('#nav_container_desktop_results');
  }

  async navigateTo(baseURL: string): Promise<HomePage> {
    await this.page.goto(baseURL);
    return this;
  }

  async acceptCookiesIfPresent(): Promise<HomePage> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
    return this;
  }

  async clickResultsTab(): Promise<HomePage> {
    await this.resultsTab.click();
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  async clickSeeAllResultsIfPresent(url: string): Promise<HomePage> {
    try {
      // Wait for the results container to be visible
      await this.resultsContainer.waitFor({ state: 'visible', timeout: 5000 });

      // Wait for the button to be visible and enabled
      await this.seeAllResultsButton.waitFor({ state: 'visible', timeout: 5000 });

      // Try to click the button
      await this.seeAllResultsButton.click({ timeout: 5000 });
      await this.page.waitForLoadState('domcontentloaded');
      return this;
    } catch (error) {
      // Fallback: navigate directly if button is not clickable
      console.warn('Could not click "See all results" button, navigating directly:', error);
      await this.page.goto(`${url}/results`);
      await this.page.waitForLoadState('domcontentloaded');
      return this;
    }
  }

}