import { expect, test } from '../../fixtures/pagesFixture'
import { existingUsers, generateUser } from '../../test-data/userData'

test.describe.configure({ mode: 'serial' })

test.describe('signing up tests', () => {
    test.beforeEach(async ({ signupPage }) => {
        await signupPage.goTo()
        await expect(signupPage.secondaryTitle).toHaveText("Become a member")
    })

    test(`successful signing up with new account`, async ({ loginPage, signupPage, welcomePage, getLocalStorage }) => {
        const user = generateUser()
        await signupPage.fillInCredentialsAndClickSignUpButton(
            user.firstName,
            user.lastName,
            user.email,
            user.password
        )

        await welcomePage.validatePage()

        const localStorageData = await getLocalStorage()
        const storedData = JSON.parse(localStorageData['users']);
        const users = storedData.users;

        const expectedUserLength = existingUsers.length + 1
        expect(users.length).toStrictEqual(expectedUserLength)
        expect(users).toContainEqual(user);

        await welcomePage.logOut()
        await loginPage.loginByEmailAndPassword(user.email, user.password)

        await welcomePage.validatePage()
    })
})
