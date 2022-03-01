const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page
        this.home_nav_button = this.page.locator('nav[class="main-nav"] span[class*="nav-home"]')
        this.home_label = this.page.locator('nav[class="main-nav"] div[class="sub-nav"] a:has-text("Home")')
        this.username_label = this.page.locator('*[class="dashboard__user"]')
        this.view_all_cards_button = this.page.locator('div[class="tiles virtual-cards"] a[href="/cards"]')
        this.cash_reimbursement_label = this.page.locator('a[id="banner-wrapper"][href="/approvals"] h1:has-text("Cash Reimbursement")')
    }

    async verifyHomePageOpened() {
        expect(await this.page).not.toBeNull();
        expect(await this.home_nav_button).toBeVisible()
    }

    async openHomePage() {
        await this.home_nav_button.click()
        await this.home_label.click()
    }

    async getUsername() {
        let usermsg = await this.username_label.innerText()
        return usermsg.split(",")[1].trim()
    }

    async clickOnViewAlldetails() {
        await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('https://api.spenmo-staging.com/api/v1/org/card?organisation_id') && resp.status() === 200),
            await this.view_all_cards_button.click()]);
    }

    async clickOnCashReimbursement() {
        expect(await this.cash_reimbursement_label).toBeVisible()
        await this.cash_reimbursement_label.click()
    }
}

