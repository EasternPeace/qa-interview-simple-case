import { test as base } from "@playwright/test"
import { LoginPage } from "../pageObjects/loginPage.ts"
import { WelcomePage } from "../pageObjects/welcomePage.ts"
import { SignupPage } from "../pageObjects/signupPage.ts"

type PagesFixture = {
    loginPage: LoginPage,
    welcomePage: WelcomePage,
    signupPage: SignupPage,
    getLocalStorage: () => Promise<Record<string, string>>;
}

export const test = base.extend<PagesFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    welcomePage: async ({ page }, use) => {
        await use(new WelcomePage(page))
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page))
    },
    getLocalStorage: async ({ page }, use) => {
        const getLocalStorage = async () => {
            return await page.evaluate(() => {
                return Object.entries(localStorage).reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, string>);
            });
        };
        await use(getLocalStorage);
    }
})


export { expect } from "@playwright/test"