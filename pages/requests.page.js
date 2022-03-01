const { expect } = require('@playwright/test');

exports.RequestsPage = class RequestsPage {
    constructor(page) {
        this.page = page
        this.sent_request_tab = this.page.locator('div[id*="Sent Requests"][aria-controls*="Sent Requests"]')
        this.select_reimbursement_id = (reimbursementID) => this.page.locator(`tr[data-row-key=${reimbursementID}]`)
        this.details_label = (label) => this.page.locator(`div[class="reimburse-details__request-details"] h4:has-text("${label}") + p[class*="table-row-field__details"]`)
    }

    async verifyRequestsPageOpened() {
        expect(await this.page).not.toBeNull();
        expect(await this.sent_request_tab).toBeVisible()
    }

    async switchToSentRequestsTab() {
        await this.sent_request_tab.click()
    }

    async selectReimbursementReceipt(reimbursementID) {
        await this.select_reimbursement_id(reimbursementID).click()
    }

    async verifyReimbursementLabelValue(label, value) {
        await expect(await this.details_label(label)).toHaveText(value, {
            useInnerText: true,
        });
    }
}

