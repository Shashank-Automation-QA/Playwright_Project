import { expect,test,defineConfig } from "@playwright/test";

test.beforeEach("Go To The URL",async({page}) => {
    await page.goto("https://automationexercise.com/")
    await expect(page.getByAltText('Website for automation practice')).toBeVisible();
});

test.describe("Product Catalog",() => {
    test("TC-001 View product details @smoke", async({page}) => {
        await page.getByRole('link', { name: 'View Product' }).first().click();
        await expect(page.locator('.product-information')).toContainText('Availability:');
        await expect(page.getByText('Brand:')).toBeVisible();
        await expect(page.getByText('Condition:')).toBeVisible();
    });

    test("TC-002 Validate product name, price, category and brand @regression", async({page}) => {
        const expectedProductName = await page.locator('.productinfo p').first().textContent();
        const expectedProductPrice = await page.locator('.productinfo h2').first().textContent();
        await page.locator('a[href="/product_details/1"]').click();
        const actualName = await page.locator('.product-information h2').textContent();
        const actualPrice = await page.locator('.product-information span span').textContent();
        expect(actualName?.trim()).toBe(expectedProductName?.trim());
        expect(actualPrice?.trim()).toBe(expectedProductPrice?.trim());
    });

        test.only("TC-003 Verify search results accuracy @regression", async({page}) => {
        await page.locator('a[href="/products"]').click()
        await expect(page).toHaveURL(/products/)
        await expect(page.getByText('All Products')).toBeVisible()

        const searchProductName = 'Tshirt'
        await page.locator('#search_product').fill(searchProductName)
        await page.locator('#submit_search').click()

        await expect(page.getByText('Searched Products')).toBeVisible()
        const productNames = await page.locator('.productinfo p').allTextContents()
        
        expect(productNames.length).toBeGreaterThan(0)
        const matchingProducts = productNames.filter(product =>
            product.toLowerCase().includes(searchProductName.toLowerCase())
        )
        expect(matchingProducts.length).toBeGreaterThan(0)
        console.log('Matching Products:', matchingProducts)
    });

});