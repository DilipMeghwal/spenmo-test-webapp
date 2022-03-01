const { expect } = require('@playwright/test');

exports.CardPage = class CardPage {
    constructor(page) {
        this.page = page
        this.add_card_button = this.page.locator('button[data-testid="button"] span:has-text("+ Add Card")')
        this.filter_card_number_button = this.page.locator('button span:has-text("Card Number")')
        this.card_number_input = (value) => this.page.locator(`input[type="checkbox"][value="${value}"]`)
        this.isChecked_expect = (value) => this.page.isChecked(`input[type="checkbox"][value="${value}"]`)
        this.apply_filter_button = this.page.locator('button[data-testid="button"] span:has-text("Apply")')
        this.card_number_filtered_label = this.page.locator('tbody[class="ant-table-tbody"] p[class="cards__fields__card-number"]')
    }

    async verifyCardsPageOpened() {
        expect(await this.page).not.toBeNull();
        expect(await this.add_card_button).toBeVisible()
    }

    async filterByCardNumber(cardNumberLast4Digits) {
        await this.filter_card_number_button.click()
        expect(await this.page).not.toBeNull(); debugger
        await this.card_number_input(cardNumberLast4Digits).click()
        expect(await this.isChecked_expect(cardNumberLast4Digits)).toBeTruthy()
    }

    async applyFilter() {
        await this.apply_filter_button.click()
    }

    async verifyCardNumberInFilteredRecords(cardNumberLast4Digits) {
        await expect(await this.card_number_filtered_label).toHaveText(cardNumberLast4Digits, {
            useInnerText: true,
        });
    }
}

