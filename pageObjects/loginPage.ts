import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
    private readonly emailInputField: Locator
    private readonly passwordField: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {
        super(page)
        this.emailInputField = this.page.locator('#email')
        this.passwordField = this.page.locator('#password')
        this.loginButton = this.page.getByRole('button', { name: "LOGIN" })
    }

    async goTo() {
        await this.page.goto('http://localhost:8080/login', { waitUntil: 'load' })
        await this.validatePage()
    }

    protected get uniqueElement(): Locator {
        return this.loginButton
    }

    async loginByEmailAndPassword(email: string, password: string) {
        await this.emailInputField.pressSequentially(email);
        await this.passwordField.pressSequentially(password);
        await Promise.all([
            this.page.waitForLoadState("load"),
            this.loginButton.click()
        ]);
    }
}