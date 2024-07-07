import { Locator, Page } from "@playwright/test"

export class WelcomePage {
    readonly page: Page

    readonly companyName: Locator
    readonly welcomeText: Locator
    readonly logOutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.companyName = this.page.locator('h1')
        this.welcomeText = this.page.locator("#welcome_text")
        this.logOutButton = this.page.getByRole('button', { name: "LOG OUT" })
    }
}