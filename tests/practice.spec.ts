import { test, expect } from "@playwright/test";
import { PracticePage } from "../pages/practice";
import testData from "../test-data/practice.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('Practice Tests', () => {

    let practicePage: PracticePage;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        practicePage = new PracticePage(page);
        CommonUtilsPage = new CommonUtils(page);
    });

    test('TC_001 - Drag And Drop @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.performDragAndDrop();
        await expect(practicePage.droppable()).toContainText('Dropped!');
    });

    test('TC_003 - Single File Upload @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.uploadSingleFile(testData.files.singleFile);
        await expect(practicePage.singleFileStatus()).toContainText(`Single file selected: ${testData.files.singleFile}`);
    });

    test('TC_004 - Multiple File Upload @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.uploadMultipleFiles(testData.files.multipleFiles);
        for (const file of testData.files.multipleFiles) {
            await expect(practicePage.multipleFileStatus()).toContainText(file);
        }
    });

    test('TC_005 - Download Text File @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.downloadPage);
        const download = await practicePage.downloadTextFile(testData.download.text);
        expect(download.suggestedFilename()).toMatch(/\.txt$/);
    });

    test('TC_006 - Accept Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.acceptSimpleAlert();
        expect(dialog.type).toBe(testData.dialogs.simpleAlert.type);
        expect(dialog.message).toBe(testData.dialogs.simpleAlert.message);
    });

    test('TC_007 - Dismiss Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.dismissConfirmationAlert();
        expect(dialog.type).toBe(testData.dialogs.confirmationAlert.type);
        expect(dialog.message).toBe(testData.dialogs.confirmationAlert.message);
    });

    test('TC_008 - Prompt Alert @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.handlePromptAlert(testData.dialogs.promptAlert.inputText);
        expect(dialog.type).toBe(testData.dialogs.promptAlert.type);
        expect(dialog.message).toBe(testData.dialogs.promptAlert.message);
    });

    test.only('TC_009 - Fill and submit form inside iframe @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        await practicePage.acceptButton().click();
        await expect(practicePage.frameHeading()).toBeVisible();
        await practicePage.fillFrameForm(testData.frameForm.name,testData.frameForm.message,testData.frameForm.priority,testData.frameForm.urgent);
        await expect(practicePage.frameNameInput()).toHaveValue(testData.frameForm.name);
        await expect(practicePage.frameMessageInput()).toHaveValue(testData.frameForm.message);
        await expect(practicePage.framePriorityDropdown()).toHaveValue(testData.frameForm.priority.toLowerCase());
        await expect(practicePage.urgentCheckbox()).toBeChecked();
        await practicePage.submitFrameForm();
        await expect(practicePage.frameSubmissionResult()).toBeVisible();
    });

    test('TC_010 - Open New Tab @smoke', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const newTab = await practicePage.openNewTaborWindow(practicePage.newTabLink());
    await expect(newTab).toHaveTitle(/.*/);
    console.log(await newTab.url());
    });

    test('TC_011 - Open New Window @smoke', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const childWindow = await practicePage.openNewTaborWindow(practicePage.openWindowButton());
    console.log(await childWindow.title());
    console.log(await childWindow.url());
    await expect(childWindow).toHaveURL(/.*/);
    });

});