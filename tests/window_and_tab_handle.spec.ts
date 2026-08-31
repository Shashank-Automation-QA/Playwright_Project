import { test, expect } from "@playwright/test";
import { WindowAndTabPage } from "../pages/window_and_tab_handle";
import testData from "../test-data/window_and_tab_handle.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('Window And Tab  Handle', () => {

    let windowAndTabPage: WindowAndTabPage;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        windowAndTabPage = new WindowAndTabPage(page);
        CommonUtilsPage = new CommonUtils(page);
    });

    test('TC_001 - Open New Tab @smoke', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const newTab = await windowAndTabPage.openNewTaborWindow(windowAndTabPage.newTabLink());
    await expect(newTab).toHaveTitle(/.*/);
    console.log(await newTab.url());
    });

    test('TC_002 - Open New Window @smoke', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const childWindow = await windowAndTabPage.openNewTaborWindow(windowAndTabPage.openWindowButton());
    console.log(await childWindow.title());
    console.log(await childWindow.url());
    await expect(childWindow).toHaveURL(/.*/);
    });

});