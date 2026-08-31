// ********************************** Importing Libraries from playwright ****************************************************
import { test, expect } from "@playwright/test";

// **************************************** Importing Resource Files *********************************************************
import { CommonUtils } from "../Utils/CommonUtils";
import { CheckoutAndOrderPlacement } from "../pages/CheckoutAndOrderPlacement";
import testData from "../test-data/assignment_pom.json";

test.describe("Checkout And Order Placement", () => {

    let productPage: CheckoutAndOrderPlacement;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {

        // Creating object for both function pages
        productPage = new CheckoutAndOrderPlacement(page);
        CommonUtilsPage = new CommonUtils(page);

        await CommonUtilsPage.openApplication(testData.baseUrl);
        await expect.soft(page.getByAltText('Website for automation practice')).toBeVisible();
        await CommonUtilsPage.login(testData.email, testData.password);
    });

    test("TC_CHECKOUT_001 Proceed to checkout @regression", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await expect.soft(productPage.proceedToCheckoutBtn()).toBeVisible();
        // Hard Assert
        await expect(productPage.deliveryAddress()).toBeVisible();
    });

    test("TC_CHECKOUT_002 Verify delivery address @regression", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        const addressText = await productPage.deliveryAddress().textContent();
        expect.soft(addressText).toContain(testData.yourDeliveryAddressTitle);
        expect.soft(addressText).toContain(testData.title);
        expect.soft(addressText).toContain(testData.name);
        expect.soft(addressText).toContain(testData.address);
        expect.soft(addressText).toContain(testData.cityState);
        expect.soft(addressText).toContain(testData.zipcode);
        expect.soft(addressText).toContain(testData.country);
        // Hard Assert
        expect(addressText).toContain(testData.mobile);
    });

    test("TC_CHECKOUT_003 Verify billing information @regression", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        const addressText = await productPage.billingAddress().textContent();
        expect.soft(addressText).toContain(testData.yourBillingAddressTitle);
        expect.soft(addressText).toContain(testData.title);
        expect.soft(addressText).toContain(testData.name);
        expect.soft(addressText).toContain(testData.address);
        expect.soft(addressText).toContain(testData.cityState);
        expect.soft(addressText).toContain(testData.zipcode);
        expect.soft(addressText).toContain(testData.country);
        // Hard Assert
        expect(addressText).toContain(testData.mobile);
    });

    test("TC_CHECKOUT_004 Place an order successfully @regression", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.placeOrder(testData.orderComment, testData.cardName, testData.cardNumber, testData.cvc, testData.expiryMonth, testData.expiryYear);
        // Hard Assert
        await CommonUtilsPage.verifyOrderPlacedSuccessfully(productPage.orderSuccessMessage(),"Order Placed!");
    });

    test("TC_CHECKOUT_005 Verify order confirmation message @regression", async () => {

        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await productPage.placeOrder(testData.orderComment, testData.cardName, testData.cardNumber, testData.cvc, testData.expiryMonth, testData.expiryYear);
        // Hard Assert
        await CommonUtilsPage.verifyOrderPlacedSuccessfully(productPage.orderConfirmationMessage(),"Congratulations! Your order has been confirmed!");
    });

});

