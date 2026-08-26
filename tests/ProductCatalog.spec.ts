// ********************************** Importing Libraries from playwright ****************************************************
import { test, expect } from "@playwright/test";

// **************************************** Importing Resource Files *********************************************************
import { CommonUtils } from "../Utils/CommonUtils";
import { ProductCatalog } from "../pages/ProductCatalog";
import testData from "../test-data/assignment_pom.json";

test.describe("Product Catalog", () => {

    let productPage: ProductCatalog;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {

        // Creating object for both function pages
        productPage = new ProductCatalog(page);
        CommonUtilsPage = new CommonUtils(page);
        
        await CommonUtilsPage.openApplication(testData.baseUrl);
        await expect.soft(page.getByAltText('Website for automation practice')).toBeVisible();
        await CommonUtilsPage.login(testData.email, testData.password);
    });

    test("TC_PROD_003 View product details @smoke", async () => {

        await productPage.clickFirstViewProduct();
        await expect.soft(productPage.productInformation()).toContainText("Availability:");
        await expect.soft(productPage.brandText()).toBeVisible();
        // Hard Assert
        await expect(productPage.conditionText()).toBeVisible();
    });

    test("TC_PROD_004 Validate product name, price, category and brand @regression", async () => {

        const expectedProductName = await productPage.getFirstProductName();
        const expectedProductPrice = await productPage.getFirstProductPrice();
        await productPage.openProductDetails(testData.productId);
        const actualName = await productPage.getActualProductName();
        const actualPrice = await productPage.getActualProductPrice();
        expect.soft(actualName?.trim()).toBe(expectedProductName?.trim());
        expect(actualPrice?.trim()).toBe(expectedProductPrice?.trim());
    });
});