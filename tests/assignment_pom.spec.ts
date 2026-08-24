import { test, expect } from "@playwright/test";
import { AssignmentPOM } from "../pages/Assignment_POM.spec";
import testData from "../test-data/assignment_pom.json";

test.describe("Product Catalog", () => {

    let productPage: AssignmentPOM;

    test.beforeEach(async ({ page }) => {
        productPage = new AssignmentPOM(page);
        await productPage.openApplication(testData.baseUrl);
        await productPage.login(testData.email, testData.password);
    });

    test("TC-001 View product details @smoke", async () => {

        await productPage.clickFirstViewProduct();
        await expect.soft(productPage.productInformation()).toContainText("Availability:");
        await expect.soft(productPage.brandText()).toBeVisible();
        // Hard Assert
        await expect(productPage.conditionText()).toBeVisible();
    });

    test("TC-002 Validate product name, price, category and brand @regression", async () => {

        const expectedProductName = await productPage.getFirstProductName();
        const expectedProductPrice = await productPage.getFirstProductPrice();
        await productPage.openProductDetails(testData.productId);
        const actualName = await productPage.getActualProductName();
        const actualPrice = await productPage.getActualProductPrice();
        expect.soft(actualName?.trim()).toBe(expectedProductName?.trim());
        expect(actualPrice?.trim()).toBe(expectedProductPrice?.trim());
    });

    test("TC-003 Verify search results accuracy @regression", async () => {

        await productPage.openProductsPage();
        await productPage.searchProduct(testData.searchProductName);
        const productNames = await productPage.getProductNames();
        expect.soft(productNames.length).toBeGreaterThan(0);
        const matchingProducts = productNames.filter(product =>
            product.toLowerCase().includes(testData.searchProductName.toLowerCase())
        );
        // Final Validation
        expect(matchingProducts.length).toBeGreaterThan(0);
        console.log("Matching Products:", matchingProducts);
    });

    test("TC-004 Proceed to checkout", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await expect.soft(productPage.proceedToCheckoutBtn()).toBeVisible();
        // Hard Assert
        await expect(productPage.deliveryAddress()).toBeVisible();
    });

    test("TC-005 Verify delivery address", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.validateAddress(productPage.deliveryAddress(), testData.yourDeliveryAddressTitle, testData
    );
    });

    test("TC-006 Verify billing information", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.validateAddress(productPage.billingAddress(), testData.yourBillingAddressTitle, testData
    );
    });

    test("TC-007 Place an order successfully", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.placeOrder(testData.orderComment, testData.cardName, testData.cardNumber, testData.cvc, testData.expiryMonth, testData.expiryYear);
        // Hard Assert
        await productPage.verifyOrderPlacedSuccessfully(productPage.orderSuccessMessage(),"Order Placed!");
    });

    test("TC-008 Verify order confirmation message", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.placeOrder(testData.orderComment, testData.cardName, testData.cardNumber, testData.cvc, testData.expiryMonth, testData.expiryYear);
        // Hard Assert
        await productPage.verifyOrderPlacedSuccessfully(productPage.orderConfirmationMessage(),"Congratulations! Your order has been confirmed!");
    });

});

