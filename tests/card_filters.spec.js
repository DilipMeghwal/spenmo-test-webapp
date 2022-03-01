const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../pages/login.page")
const { HomePage } = require('../pages/home.page')
const { CardPage } = require('../pages/cards.page')

test.describe('Validate the card filter', () => {
    test('Validate the card filter', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        const cardPage = new CardPage(page)

        await test.step('Login with valid credentials', async () => {
            await loginPage.navigateToLoginPage()
            await loginPage.loginIn("admin@bd.com", "spenmo@123")
        })

        await test.step('Click on the View Details/All link under the cards section', async () => {
            await homePage.verifyHomePageOpened()
            await homePage.openHomePage()
            await homePage.clickOnViewAlldetails()
        })

        await test.step('Put a filter for one of the card numbers - say X', async () => {
            await cardPage.verifyCardsPageOpened()
            await cardPage.filterByCardNumber("4351")
        })

        await test.step('Apply the filter', async () => {
            await cardPage.applyFilter()
        })

        await test.step('After the list has loaded, please make sure only the card numbers ending with X are displayed.', async () => {
            await cardPage.verifyCardNumberInFilteredRecords("4351")
        })
    });
});

