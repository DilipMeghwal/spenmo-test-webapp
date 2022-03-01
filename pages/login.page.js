const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        this.email_input = this.page.locator('input[id="login_email"]')
        this.password_input = this.page.locator('input[id="login_password"]')
        this.login_button = this.page.locator('button[id="loginBtn"]')
    }

    async navigateToLoginPage() {
        await this.page.goto('/login');
        expect(await this.page).not.toBeNull();
        await expect(await this.email_input).toBeVisible()
    }

    async loginIn(username, password) {
        await this.email_input.fill(username)
        await this.password_input.fill(password)
        await this.login_button.click()
    }
}

