import { testApp as test, expect } from "../fixtures/testfixture";

test("To select country name from dropdown", async ({ fixturePage: page }) => {

    const country = page.locator('#country');

    await country.selectOption('Germany');

    await expect(country).toHaveValue('Germany');

});