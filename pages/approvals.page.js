const { expect } = require('@playwright/test');

exports.ApprovalPage = class ApprovalPage {
    constructor(page) {
        this.page = page
        this.merchant_input = this.page.locator('input[id="merchant"]')
        this.select_category_dropdown = this.page.locator('div[class*="category-dropdown"] input[type="search"]')
        this.select_category_list = this.page.locator('div[class*="ant-select-item-option-active"]')
        this.select_currency_input = this.page.locator('div[class*="amount__select"]')
        this.select_currency_list = (currency) => this.page.locator(`div[title="${currency}"]`)
        this.amount_input = this.page.locator('input[class="select-amount__input-amount "]')
        this.select_date_input = this.page.locator('input[placeholder="Select date"]')
        this.date_label = (date) => this.page.locator(`table[class="ant-picker-content"] td[title="${date}"]`)
        this.message_input = this.page.locator('textarea[id="notes"]')
        this.upload_file_input = this.page.locator('input[type="file"]')
        this.submit_reimbursement_input = this.page.locator('button[id="addReimbursementSubmit"]')
    }

    async verifyApprovalsPageOpened() {
        expect(await this.page).not.toBeNull();
        expect(await this.merchant_input).toBeVisible()
    }

    async enterMerchantName(merchantName) {
        await this.merchant_input.fill(merchantName)
    }

    async selectCategory(category) {
        await this.select_category_dropdown.fill(category)
        expect(await this.select_category_list).toBeVisible()
        await this.select_category_list.click()
    }

    async selectCurrency(currency) {
        await this.select_currency_input.click()
        expect(await this.select_currency_list(currency)).toBeVisible()
        await this.select_currency_list(currency).click()
    }

    async enterAmount(amount) {
        await this.amount_input.fill(amount)
    }

    async selectDate(date) {
        await this.select_date_input.click()
        await this.date_label(date).click()
    }

    async enterMessage(message) {
        await this.message_input.fill(message)
    }

    async uploadReceipt(fileName) {
        await this.page.setInputFiles('input[type="file"]', 'test_data/receipts/files/' + fileName)
        const promise = this.page.waitForResponse("https://api.spenmo-staging.com/api/v1/photo");
        const resPromise = await promise;
        let response = await resPromise.json();
        expect(response.status).toEqual(200)
    }

    async submitReimbursement() {
        await this.submit_reimbursement_input.click({ force: true })
    }
    async getReimbursementID() {
        const promise = this.page.waitForResponse("https://api.spenmo-staging.com/api/v1/fund/request");
        const resPromise = await promise;
        let response = await resPromise.json();
        expect(response.status).toEqual(200)
        return response.payload.reimbursement_id
    }
}

