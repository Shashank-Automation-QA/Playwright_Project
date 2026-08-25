import { Page, Locator, expect } from "@playwright/test";

export class CommonUtils {
    constructor(private page: Page) { }    
    
// *************************************************Locators******************************************************************

   // Login Locators
    loginLink = () => this.page.locator("a[href='/login']");
    emailInput = () => this.page.locator("[data-qa='login-email']");
    passwordInput = () => this.page.locator("[data-qa='login-password']");
    loginButton = () => this.page.locator("[data-qa='login-button']");



// **************************************************Methods******************************************************************
    async openApplication(url: string) {
        await this.page.goto(url);
    
    }

    async login(email: string, password: string) {
        await this.loginLink().click();
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }

        async verifyOrderPlacedSuccessfully(locator: Locator, msg: string) {
        await expect.soft(locator).toBeVisible();
        await expect(locator).toContainText(msg);
    }
}