import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class SignupPage extends BasePage {
    readonly secondaryTitle: Locator
    private readonly firstNameField: Locator
    private readonly lastNameField: Locator
    private readonly emailInputField: Locator
    private readonly passwordField: Locator
    private readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.secondaryTitle = this.page.locator(".signup h2")
        this.firstNameField = this.page.locator('#firstName')
        this.lastNameField = this.page.locator('#lastName')
        this.emailInputField = this.page.locator('#email')
        this.passwordField = this.page.locator('#password')
        this.submitButton = this.page.getByRole('button', { name: "SUBMIT" })
    }

    async goTo() {
        await this.page.goto('http://localhost:8080/signup', { waitUntil: 'load' })
        await this.validatePage()
    }

    protected get uniqueElement(): Locator {
        return this.submitButton
    }

    async fillInCredentialsAndClickSignUpButton(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameField.pressSequentially(firstName);
        await this.lastNameField.pressSequentially(lastName);
        await this.emailInputField.pressSequentially(email);
        await this.passwordField.pressSequentially(password);
        await Promise.all([
            this.page.waitForLoadState("load"),
            this.submitButton.click()
        ]);
    }
}