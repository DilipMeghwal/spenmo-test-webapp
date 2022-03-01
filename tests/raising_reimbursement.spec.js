const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../pages/login.page")
const { HomePage } = require('../pages/home.page')
const { ApprovalPage } = require('../pages/approvals.page')
const { RequestsPage } = require('../pages/requests.page')
const users = require('../test_data/users/users.json')
const receipt = require('../test_data/receipts/data/reimbursement.json')


test.describe('Validate the reimbursement', () => {
    test('Validate the reimbursement form', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        const approvalsPage = new ApprovalPage(page)
        const requestsPage = new RequestsPage(page)

        let username = null
        let reimbursementID = null

        await test.step('Login with valid credentials', async () => {
            await loginPage.navigateToLoginPage()
            await loginPage.loginIn(users.user0.username, users.user0.password)
            username = await homePage.getUsername()
        })

        await test.step('Click on Cash Reimbursement button', async () => {
            await homePage.verifyHomePageOpened()
            await homePage.clickOnCashReimbursement()
        })

        await test.step('Fill in the details, attach a receipt.', async () => {
            await approvalsPage.verifyApprovalsPageOpened()
            await approvalsPage.enterMerchantName(receipt.receipt0.merchant)
            await approvalsPage.selectCategory(receipt.receipt0.category)
            await approvalsPage.selectCurrency(receipt.receipt0.currency)
            await approvalsPage.enterAmount(receipt.receipt0.amount)
            if (receipt.receipt0.date == null) {
                //get todays date
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                await approvalsPage.selectDate(today)
            } else {
                await approvalsPage.selectDate(today)
            }
            await approvalsPage.enterMessage(receipt.receipt0.message)
            await approvalsPage.uploadReceipt(receipt.receipt0.file)
        })

        await test.step('Submit the form', async () => {
            await approvalsPage.submitReimbursement()
            reimbursementID = await approvalsPage.getReimbursementID()
        })

        await test.step('Click on Sent requests', async () => {
            await requestsPage.switchToSentRequestsTab()
            await requestsPage.selectReimbursementReceipt(reimbursementID)

        })

        await test.step('Click on the first entry to match the details which were entered while raising the cash reimbursement request', async () => {
            await requestsPage.verifyReimbursementLabelValue("Requested by", username)
            await requestsPage.verifyReimbursementLabelValue("Merchant", receipt.receipt0.merchant)
            await requestsPage.verifyReimbursementLabelValue("Category", receipt.receipt0.category)
            await requestsPage.verifyReimbursementLabelValue("Notes", receipt.receipt0.message)
        })
    });
});

