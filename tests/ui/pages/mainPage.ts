import { Page, Locator } from '@playwright/test';

export class MainPage {
    // Page instance
    readonly page: Page;

    // Locators
    readonly elementsLink: Locator;
    readonly formsLink: Locator;
    readonly alertsFramesWindowsLink: Locator;
    readonly widgetsLink: Locator;
    readonly interactionsLink: Locator;
    readonly bookStoreApplicationLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elementsLink = page.getByText('Elements');
        this.formsLink = page.getByText('Forms');
        this.alertsFramesWindowsLink = page.getByText('Alerts, Frame & Windows');
        this.widgetsLink = page.getByText('Widgets');
        this.interactionsLink = page.getByText('Interactions');
        this.bookStoreApplicationLink = page.getByText('Book Store Application');
    }

    // Actions
    async goto() {
        await this.page.goto('https://demoqa.com/');
    }

    async clickElementsLink() {
        await this.elementsLink.click();
    }
}