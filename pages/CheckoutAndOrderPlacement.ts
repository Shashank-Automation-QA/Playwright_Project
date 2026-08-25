import { Locator, Page, expect } from "@playwright/test";

export class CheckoutAndOrderPlacement {
    constructor(private page: Page) { }

    //*********************************************** Locators ************************************************************

    productsMenu = () => this.page.locator('a[href="/products"]');
    searchBox = () => this.page.locator('#search_product');
    searchButton = () => this.page.locator('#submit_search');
    searchedProductsText = () => this.page.getByText('Searched Products');
    allProductsText = () => this.page.getByText('All Products');

    productNames = () => this.page.locator('.productinfo p');

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
    
    async openProductsPage() {
        await this.productsMenu().click();
        // await expect.soft(this.page).toHaveURL(/products/);
        // await expect.soft(this.allProductsText()).toBeVisible();
    }

    async searchProduct(productName: string) {
        await this.searchBox().fill(productName);
        await this.searchButton().click();
        // await expect.soft(this.searchedProductsText()).toBeVisible();
    }

    async getProductNames() {
        return await this.productNames().allTextContents();
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
    
}