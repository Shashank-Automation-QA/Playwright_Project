import { expect,test,defineConfig } from "@playwright/test";

// ***********************************Test Setup*************************************
// beforeAll   --> Suite Setup
// beforeEach  --> Test Setup
// afterEach   --> Test Teardown
// afterAll    --> Suite Teardown

test.beforeEach("Go To The URL",async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page).toHaveTitle(/Automation Testing Practice/)
});

// ***********************************Test Cases*************************************
// We cas do test case grouping through describe keyword so we can see i have grouped test case 001, 002 and 003
// So Gernally test setup, test terdown and suit setup, suite teardown we write inside the describe 
// To run perticular describe group TC we use >>>>>    npx playwright test --grep "Enter Data on Page"

test.describe("Enter Data on Page",() => {

    test("TC-001 Enter Name @smoke", async({page}) => {
        await page.getByRole("textbox",{name : "Enter Name"}).fill("Shashank Singh")
        await expect(page.locator("#name")).toHaveValue("Shashank Singh")
    });

    test("TC-002 Enter Email ID", async({page}) => {
        await page.getByRole("textbox", { name: "Enter EMail" }).fill("singhshashank091@gmail.com")
        
    });

    test("TC-003 Enter the Phone Number",async ({page}) => {
        await page.getByRole("textbox",{name : "Enter Phone"}).fill("7053902883")

    });

});

// to run perticular test case we use >>>>>> npx playwright test --grep "TC-004"
// we have only keyword as well to run perticulat test case simple we have to add (test.only) for specific test or describe group

// to run perticular smoke test cases in perticular file we use >>>>>> npx playwright test enter_and_click.spec.ts --grep "@smoke"
// to run perticular smoke test cases in across all files we use >>>>>> npx playwright test --grep "@smoke"


test("TC-004 Enter Name, Email and Phone @smoke", async({page}) => {
    await page.getByRole("textbox", {name : "Enter Name"}).fill("Shahsank Singh")
    await page.getByRole("textbox", {name : "Enter EMail"}).fill("singhshashank091@gmail.com")
    await page.getByRole("textbox", {name : "Enter Phone"}).fill("7053902883")
    await page.getByRole("button", {name : "START"}).click()
    await expect(page.locator('[name = "stop"]')).toHaveText("STOP")

});

test("TC-005 Enter Name, Email with pressSequentially", async({page}) => {
    await page.getByRole("textbox", {name : "Enter Name"}).pressSequentially("Shahsank Singh")
    await page.getByRole("textbox", {name : "Enter EMail"}).pressSequentially("singhshashank091@gmail.com")
});

test("TC-006 Enter Name, Email pressing enter button", async({page}) => {
    await page.getByRole("textbox", {name : "Enter Name"}).pressSequentially("Shahsank Singh")
    await page.getByRole("textbox", {name : "Enter EMail"}).pressSequentially("singhshashank091@gmail.com")
    await page.keyboard.press("Enter")
});

test("TC-007 Select checkbox and unselect Check box", async({page}) => {
    await page.getByRole("checkbox", {name : "Sunday"}).check
    await page.getByRole("checkbox", {name : "Monday"}).check
    await page.getByRole("checkbox", {name : "Saturday"}).check
    
});

test("TC-008 Select dropdown value", async({page}) => {
    await page.getByRole("combobox", {name : "Country"}).selectOption("India")
    
});

test("TC-009 Select multiple values", async({page}) => {
    await page.getByRole("option", {name : "Red"}).selectOption
    await page.getByRole("option", {name : "Blue"}).selectOption
    await page.getByRole("option", {name : "Green"}).selectOption
});

test("TC-010 Select checkboxes are selected or not verify", async({page}) => {
    await page.getByRole("checkbox", {name : "Sunday"}).check
    await expect(page.locator("#sunday")).toBeChecked
    await page.getByRole("checkbox", {name : "Monday"}).check
    await expect(page.locator("#monday")).toBeChecked
    await page.getByRole("checkbox", {name : "Saturday"}).check
    await expect(page.locator("#saturday")).toBeChecked
});

test("TC-011 Login to applicationa and check the workflow", async({page}) => {
    await page.goto("https://saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByRole("textbox",{name : "Username"}).fill("standard_user");
    await page.getByRole("textbox",{name : "Password"}).fill("secret_sauce");
    await page.getByRole("button",{name : "Login"}).click();
    await expect(page.getByText('Swag Labs')).toBeVisible();
    // Product headers assertion

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    // await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    await expect(
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
    await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
    // await expect(
    // await page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Onesie' })).toBeVisible();
    await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();

    await page.getByRole("button",{name : "Open Menu"}).click();
    await expect(page.getByText('Logout')).toBeVisible();
 
});
