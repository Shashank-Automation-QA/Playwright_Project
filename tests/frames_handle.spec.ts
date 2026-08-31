import { test, expect } from "@playwright/test";
import { FramesHandlePage } from "../pages/frames_handle";
import testData from "../test-data/frames_handle.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('Frames Handle', () => {

    let framesHandlePage: FramesHandlePage;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        framesHandlePage = new FramesHandlePage(page);
        CommonUtilsPage = new CommonUtils(page);
    });

    test('TC_001 - Fill and submit form inside iframe @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        await framesHandlePage.acceptButton().click();
        await expect.soft(framesHandlePage.frameHeading()).toBeVisible();
        await framesHandlePage.fillFrameForm(testData.frameForm);
        await expect.soft(framesHandlePage.frameNameInput()).toHaveValue(testData.frameForm.name);
        await expect.soft(framesHandlePage.frameMessageInput()).toHaveValue(testData.frameForm.message);
        await expect.soft(framesHandlePage.framePriorityDropdown()).toHaveValue(testData.frameForm.priority.toLowerCase());
        await expect.soft(framesHandlePage.urgentCheckbox()).toBeChecked();
        await framesHandlePage.submitFrameForm();
        await expect(framesHandlePage.frameSubmissionResult()).toBeVisible();
    });

        test('TC_002 - Handle form inside nested child frame', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);
        await framesHandlePage.acceptButton().click();
        await expect.soft(framesHandlePage.parentFrameHeading()).toHaveText(testData.nestedFrame.parentHeading);
        // Verify child frame
        await expect.soft(framesHandlePage.childFrameHeading()).toHaveText(testData.nestedFrame.childHeading);
        // Enter data inside child frame
        await framesHandlePage.fillChildFrameForm(testData.nestedFrame.name, testData.nestedFrame.message);
        // Validate entered values
        await expect.soft(framesHandlePage.childNameInput()).toHaveValue(testData.nestedFrame.name);
        await expect.soft(framesHandlePage.childMessageInput()).toHaveValue(testData.nestedFrame.message);
        // Submit form inside child frame
        await framesHandlePage.submitChildFrameForm();
        // Validate result inside child frame
        await expect(framesHandlePage.childSuccessMessage()).toContainText(testData.nestedFrame.successMessage);
    });

    test('TC_003 - Reset child frame and access parent and main page', async () => {
        await CommonUtilsPage.openApplication(testData.urls.framesPage);

        await framesHandlePage.fillChildFrameForm(testData.nestedFrame.name, testData.nestedFrame.message);

        await framesHandlePage.resetChildFrameForm();

        await expect.soft(framesHandlePage.childNameInput()).toHaveValue('');
        await expect.soft(framesHandlePage.childMessageInput()).toHaveValue('');

        await expect.soft(framesHandlePage.parentFrameHeading()).toHaveText(testData.nestedFrame.parentHeading);

        await framesHandlePage.scrollToMainPageHeading();
        await expect(framesHandlePage.framesAndWindowsHeading()).toBeVisible();
    });

});