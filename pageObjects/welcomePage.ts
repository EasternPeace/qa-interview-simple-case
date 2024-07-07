import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class WelcomePage extends BasePage {
    readonly companyName: Locator
    readonly welcomeText: Locator
    readonly logOutButton: Locator

    constructor(page: Page) {
        super(page)
        this.companyName = this.page.locator('h1')
        this.welcomeText = this.page.locator("#welcome_text")
        this.logOutButton = this.page.getByRole('button', { name: "LOG OUT" })
    }

    protected get uniqueElement(): Locator {
        return this.logOutButton
    }

    async logOut() {
        await Promise.all([
            this.page.waitForLoadState("load"),
            this.logOutButton.click()
        ]);
    }
}