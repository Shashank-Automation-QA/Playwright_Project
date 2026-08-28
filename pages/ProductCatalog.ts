import { Locator, Page } from "@playwright/test";

export class ProductCatalog {
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

    //*********************************************** Methods ************************************************************

    async clickFirstViewProduct() {
        await this.viewProductLink().click();
    }

    async getFirstProductName() {
        return await this.firstProductName().textContent();
    }

    async getFirstProductPrice() {
        return await this.firstProductPrice().textContent();
    }

    async getActualProductName() {
        return await this.productDetailsName().textContent();
    }

    async getActualProductPrice() {
        return await this.productDetailsPrice().textContent();
    }

    async openProductDetails(productId: number) {
        await this.page.locator(`a[href="/product_details/${productId}"]`).click();
    }
}