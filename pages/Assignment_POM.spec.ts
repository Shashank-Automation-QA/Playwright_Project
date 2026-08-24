import { Locator, Page, expect } from "@playwright/test";

export class AssignmentPOM {
    constructor(private page: Page) { }

    //*********************************************** Locators ************************************************************

    viewProductLink = () => this.page.getByRole('link', { name: 'View Product' }).first();
    productInformation = () => this.page.locator('.product-information');
    brandText = () => this.page.getByText('Brand:');
    conditionText = () => this.page.getByText('Condition:');

    firstProductName = () => this.page.locator('.productinfo p').first();
    firstProductPrice = () => this.page.locator('.productinfo h2').first();

    productDetailsName = () => this.page.locator('.product-information h2');
    productDetailsPrice = () => this.page.locator('.product-information span span');

    productsMenu = () => this.page.locator('a[href="/products"]');
    searchBox = () => this.page.locator('#search_product');
    searchButton = () => this.page.locator('#submit_search');
    searchedProductsText = () => this.page.getByText('Searched Products');
    allProductsText = () => this.page.getByText('All Products');

    productNames = () => this.page.locator('.productinfo p');

    // Login Locators
    loginLink = () => this.page.locator("a[href='/login']");
    emailInput = () => this.page.locator("[data-qa='login-email']");
    passwordInput = () => this.page.locator("[data-qa='login-password']");
    loginButton = () => this.page.locator("[data-qa='login-button']");

    // Product Locators
    firstProductAddToCart = () => this.page.locator("a[data-product-id='1']").first();
    viewCartLink = () => this.page.getByText("View Cart");

    // Checkout Locators
    proceedToCheckoutBtn = () => this.page.locator(".check_out");
    deliveryAddress = () => this.page.locator("#address_delivery");
    billingAddress = () => this.page.locator("#address_invoice");
    commentBox = () => this.page.locator("textarea[name='message']");
    placeOrderBtn = () => this.page.locator("a[href='/payment']");

    // Payment Locators
    nameOnCard = () => this.page.locator("[name='name_on_card']");
    cardNumber = () => this.page.locator("[name='card_number']");
    cvc = () => this.page.locator("[name='cvc']");
    expiryMonth = () => this.page.locator("[name='expiry_month']");
    expiryYear = () => this.page.locator("[name='expiry_year']");
    payAndConfirmOrderBtn = () => this.page.locator("#submit");
    orderSuccessMessage = () => this.page.locator("[data-qa='order-placed']");
    orderConfirmationMessage = () => this.page.locator('.col-sm-9.col-sm-offset-1');

    //*********************************************** Methods ************************************************************

    async openApplication(baseUrl: string) {
        await this.page.goto(baseUrl);
        await expect.soft(this.page.getByAltText('Website for automation practice')).toBeVisible();
    }

    async clickFirstViewProduct() {
        await this.viewProductLink().click();
    }

    async validateProductDetails() {
        await expect.soft(this.productInformation()).toContainText('Availability:');
        await expect.soft(this.brandText()).toBeVisible();
        await expect.soft(this.conditionText()).toBeVisible();
    }

    async getFirstProductName() {
        return await this.firstProductName().textContent();
    }

    async getFirstProductPrice() {
        return await this.firstProductPrice().textContent();
    }

    async openProductDetails(productId: number) {
        await this.page.locator(`a[href="/product_details/${productId}"]`).click();
    }

    async getActualProductName() {
        return await this.productDetailsName().textContent();
    }

    async getActualProductPrice() {
        return await this.productDetailsPrice().textContent();
    }

    async openProductsPage() {
        await this.productsMenu().click();
        await expect.soft(this.page).toHaveURL(/products/);
        await expect.soft(this.allProductsText()).toBeVisible();
    }

    async searchProduct(productName: string) {
        await this.searchBox().fill(productName);
        await this.searchButton().click();
        await expect.soft(this.searchedProductsText()).toBeVisible();
    }

    async getProductNames() {
        return await this.productNames().allTextContents();
    }

    async login(email: string, password: string) {
        await this.loginLink().click();
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }

    async addProductToCart() {
        await this.firstProductAddToCart().click();
        await this.viewCartLink().click();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutBtn().click();
    }

    async verifyDeliveryAddress() {
        await expect.soft(this.deliveryAddress()).toBeVisible();
    }

    async verifyBillingAddress() {
        await expect.soft(this.billingAddress()).toBeVisible();
    }
    
    async validateAddress( addressLocator: Locator, addressTitle: string, expectedData: any) {
        // await this.addProductToCart();
        // await this.proceedToCheckout();
        const addressText = await addressLocator.textContent();
        expect.soft(addressText).toContain(addressTitle);
        expect.soft(addressText).toContain(expectedData.title);
        expect.soft(addressText).toContain(expectedData.name);
        expect.soft(addressText).toContain(expectedData.address);
        expect.soft(addressText).toContain(expectedData.cityState);
        expect.soft(addressText).toContain(expectedData.zipcode);
        expect.soft(addressText).toContain(expectedData.country);
        // Hard Assert
        expect(addressText).toContain(expectedData.mobile);
    }

    async placeOrder(comment: string, cardName: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
        await this.commentBox().fill(comment);
        await this.placeOrderBtn().click();
        await this.nameOnCard().fill(cardName);
        await this.cardNumber().fill(cardNumber);
        await this.cvc().fill(cvc);
        await this.expiryMonth().fill(expiryMonth);
        await this.expiryYear().fill(expiryYear);
        await this.payAndConfirmOrderBtn().click();
    }

    async verifyOrderPlacedSuccessfully(locator: Locator, msg: string) {
        await expect.soft(locator).toBeVisible();
        await expect(locator).toContainText(msg);
    }
}