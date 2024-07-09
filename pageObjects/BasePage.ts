import { Locator, Page, expect } from "@playwright/test"

export abstract class BasePage {
    protected readonly page: Page
    protected abstract get uniqueElement(): Locator;

    constructor(page: Page) {
        this.page = page
    }

    async validatePage() {
        await this.uniqueElement.waitFor({ state: 'visible', timeout: 2000 });
    }
}