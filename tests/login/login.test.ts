import { expect, test } from '../../fixtures/pagesFixture'
import { existingUsers } from '../../test-data/userData'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo()
  })

  existingUsers.forEach(user => {
    test(`logging in works with account: ${user.email}`, async ({ loginPage, welcomePage }) => {
      const expectedWelcomeText = `Welcome ${user.firstName} ${user.lastName}`
      await loginPage.loginByEmailAndPassword(user.email, user.password)

      await expect(welcomePage.companyName).toHaveText("Company")
      await expect(welcomePage.logOutButton).toBeVisible()
      await expect(welcomePage.welcomeText).toHaveText(expectedWelcomeText)
    })
  })
})
