import { test, expect } from "@playwright/test";
import { PopupHandle } from "../pages/popup_handel";
import testData from "../test-data/popup_handle.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('Popup Handle', () => {

    let PopupHandlePage: PopupHandle;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        PopupHandlePage = new PopupHandle(page);
        CommonUtilsPage = new CommonUtils(page);
    });

    test('TC_001 - Accept Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await PopupHandlePage.acceptSimpleAlert();
        expect.soft(dialog.type).toBe(testData.dialogs.simpleAlert.type);
        expect(dialog.message).toBe(testData.dialogs.simpleAlert.message);
    });

    test('TC_002 - Dismiss Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await PopupHandlePage.dismissConfirmationAlert();
        expect.soft(dialog.type).toBe(testData.dialogs.confirmationAlert.type);
        expect(dialog.message).toBe(testData.dialogs.confirmationAlert.message);
    });

    test('TC_003 - Prompt Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await PopupHandlePage.handlePromptAlert(testData.dialogs.promptAlert.inputText);
        expect.soft(dialog.type).toBe(testData.dialogs.promptAlert.type);
        expect(dialog.message).toBe(testData.dialogs.promptAlert.message);
    })
});