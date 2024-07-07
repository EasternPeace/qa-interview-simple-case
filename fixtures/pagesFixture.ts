import { test as base } from "@playwright/test"
import { LoginPage } from "../pageObjects/loginPage.ts"
import { WelcomePage } from "../pageObjects/welcomePage.ts"

type PagesFixture = {
    loginPage: LoginPage,
    welcomePage: WelcomePage
}

export const test = base.extend<PagesFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    welcomePage: async ({ page }, use) => {
        await use(new WelcomePage(page))
    },
})

export { expect } from "@playwright/test"