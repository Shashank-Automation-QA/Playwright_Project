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

    test('TC_001 - Drag And Drop', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.performDragAndDrop();
        await expect(practicePage.droppable()).toContainText('Dropped!');
    });

    test('TC_003 - Single File Upload', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.uploadSingleFile(testData.files.singleFile);
        await expect(practicePage.singleFileStatus()).toContainText(`Single file selected: ${testData.files.singleFile}`);
    });

    test('TC_004 - Multiple File Upload', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await practicePage.uploadMultipleFiles(testData.files.multipleFiles);
        for (const file of testData.files.multipleFiles) {
            await expect(practicePage.multipleFileStatus()).toContainText(file);
        }
    });

    test('TC_005 - Download Text File', async () => {
        await CommonUtilsPage.openApplication(testData.urls.downloadPage);
        const download = await practicePage.downloadTextFile(testData.download.text);
        expect(download.suggestedFilename()).toMatch(/\.txt$/);
    });

    test('TC_006 - Accept Alert', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.acceptSimpleAlert();
        expect(dialog.type).toBe(testData.dialogs.simpleAlert.type);
        expect(dialog.message).toBe(testData.dialogs.simpleAlert.message);
    });

    test('TC_007 - Dismiss Alert', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.dismissConfirmationAlert();
        expect(dialog.type).toBe(testData.dialogs.confirmationAlert.type);
        expect(dialog.message).toBe(testData.dialogs.confirmationAlert.message);
    });

    test('TC_008 - Prompt Alert', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        const dialog = await practicePage.handlePromptAlert(testData.dialogs.promptAlert.inputText);
        expect(dialog.type).toBe(testData.dialogs.promptAlert.type);
        expect(dialog.message).toBe(testData.dialogs.promptAlert.message);
    });

    test('TC_009 - Fill and submit form inside iframe', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        await expect(practicePage.frameHeading()).toBeVisible();
        await practicePage.fillFrameForm(testData.frameForm.name,testData.frameForm.message,testData.frameForm.priority,testData.frameForm.urgent);
        await expect(practicePage.frameNameInput()).toHaveValue(testData.frameForm.name);
        await expect(practicePage.frameMessageInput()).toHaveValue(testData.frameForm.message);
        await expect(practicePage.framePriorityDropdown()).toHaveValue(testData.frameForm.priority.toLowerCase());
        await expect(practicePage.urgentCheckbox()).toBeChecked();
        await practicePage.submitFrameForm();
        await expect(practicePage.frameSubmissionResult()).toBeVisible();
    });

    test('TC_010 - Handle form inside nested child frame', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        await expect(practicePage.parentFrameHeading()).toHaveText(testData.nestedFrame.parentHeading);
        // Verify child frame
        await expect(practicePage.childFrameHeading()).toHaveText(testData.nestedFrame.childHeading);
        // Enter data inside child frame
        await practicePage.fillChildFrameForm(testData.nestedFrame.name, testData.nestedFrame.message);
        // Validate entered values
        await expect(practicePage.childNameInput()).toHaveValue(testData.nestedFrame.name);
        await expect(practicePage.childMessageInput()).toHaveValue(testData.nestedFrame.message);
        // Submit form inside child frame
        await practicePage.submitChildFrameForm();
        // Validate result inside child frame
        await expect(practicePage.childSuccessMessage()).toContainText(testData.nestedFrame.successMessage);
    });

    test('TC_011 - Reset child frame and access parent and main page', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        // Enter data inside nested child frame
        await practicePage.fillChildFrameForm(testData.nestedFrame.name, testData.nestedFrame.message);
        // Reset fields inside child frame
        await practicePage.resetChildFrameForm();
        // Validate child-frame fields
        await expect(practicePage.childNameInput()).toHaveValue('');
        await expect(practicePage.childMessageInput()).toHaveValue('');

        /*
         * Access parent frame again.
         *
         * No parentFrame() switching command is required.
         * The parent-frame locator handles the context.
         */
        await expect(practicePage.parentFrameHeading()).toHaveText(testData.nestedFrame.parentHeading);

        /*
         * Access the main page again.
         *
         * No defaultContent() switching command is required.
         * A page locator automatically targets the main page.
         */
        await practicePage.scrollToMainPageHeading();
        await expect(practicePage.framesAndWindowsHeading()).toBeVisible();
    });

    test('TC_012 - Open New Tab', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const newTab = await practicePage.openNewTab();
    await expect(newTab).toHaveTitle(/.*/);
    console.log(await newTab.url());
    });

    test('TC_013 - Open New Window', async () => {
    await CommonUtilsPage.openApplication(testData.urls.framesPage);
    const childWindow = await practicePage.openWindow();
    console.log(await childWindow.title());
    console.log(await childWindow.url());
    await expect(childWindow).toHaveURL(/.*/);
    });

});