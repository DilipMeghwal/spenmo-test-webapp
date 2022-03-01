// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    testDir: 'tests',
    timeout: 30000,
    expect: { timeout: 30000 },
    reporter: [['html', { open: 'never', outputFolder: 'test-reports' }]],
    use: {
        baseURL: 'https://dashboard.spenmo-staging.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],
};
module.exports = config;