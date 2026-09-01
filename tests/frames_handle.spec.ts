import { test, expect } from "@playwright/test";
import { FramesHandlePage } from "../pages/frames_handle";
import frames_handle from "../test-data/frames_handle.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('Frames Handle', () => {

    let framesHandlePage: FramesHandlePage;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        framesHandlePage = new FramesHandlePage(page);
        CommonUtilsPage = new CommonUtils(page);
    });

    test.only('TC_001 - Fill and submit form inside iframe @smoke', async () => {
        await CommonUtilsPage.openApplication(frames_handle.urls.framesPage);
        await framesHandlePage.acceptButton().click();
        await expect.soft(framesHandlePage.frameHeading()).toBeVisible();
        await framesHandlePage.fillFrameForm(frames_handle.frameForm);
        await expect.soft(framesHandlePage.frameNameInput()).toHaveValue(frames_handle.frameForm.name);
        await expect.soft(framesHandlePage.frameMessageInput()).toHaveValue(frames_handle.frameForm.message);
        await expect.soft(framesHandlePage.framePriorityDropdown()).toHaveValue(frames_handle.frameForm.priority.toLowerCase());
        await expect.soft(framesHandlePage.urgentCheckbox()).toBeChecked();
        await framesHandlePage.submitFrameForm();
        await expect(framesHandlePage.frameSubmissionResult()).toBeVisible();
    });

        test('TC_002 - Handle form inside nested child frame', async () => {
        await CommonUtilsPage.openApplication(frames_handle.urls.framesPage);
        await framesHandlePage.acceptButton().click();
        await expect.soft(framesHandlePage.parentFrameHeading()).toHaveText(frames_handle.nestedFrame.parentHeading);
        // Verify child frame
        await expect.soft(framesHandlePage.childFrameHeading()).toHaveText(frames_handle.nestedFrame.childHeading);
        // Enter frames_handle inside child frame
        await framesHandlePage.fillChildFrameForm(frames_handle.nestedFrame.name, frames_handle.nestedFrame.message);
        // Validate entered values
        await expect.soft(framesHandlePage.childNameInput()).toHaveValue(frames_handle.nestedFrame.name);
        await expect.soft(framesHandlePage.childMessageInput()).toHaveValue(frames_handle.nestedFrame.message);
        // Submit form inside child frame
        await framesHandlePage.submitChildFrameForm();
        // Validate result inside child frame
        await expect(framesHandlePage.childSuccessMessage()).toContainText(frames_handle.nestedFrame.successMessage);
    });

    test('TC_003 - Reset child frame and access parent and main page', async () => {
        await CommonUtilsPage.openApplication(frames_handle.urls.framesPage);

        await framesHandlePage.fillChildFrameForm(frames_handle.nestedFrame.name, frames_handle.nestedFrame.message);

        await framesHandlePage.resetChildFrameForm();

        await expect.soft(framesHandlePage.childNameInput()).toHaveValue('');
        await expect.soft(framesHandlePage.childMessageInput()).toHaveValue('');

        await expect.soft(framesHandlePage.parentFrameHeading()).toHaveText(frames_handle.nestedFrame.parentHeading);

        await framesHandlePage.scrollToMainPageHeading();
        await expect(framesHandlePage.framesAndWindowsHeading()).toBeVisible();
    });

});