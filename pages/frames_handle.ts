import { Locator, Page } from "@playwright/test";
import path from "node:path";

export class FramesHandlePage {

    constructor(private page: Page) { }

    // **************************************** Locators ****************************************
    framesAndWindowsHeading = () => this.page.getByRole('heading', {name: 'Frames & Windows'});
    practiceFrame = () => this.page.frameLocator('iframe[src*="iframe-content.html"]');
    frameHeading = () => this.practiceFrame().getByRole('heading', {name: 'iFrame Form'});
    frameNameInput = () => this.practiceFrame().getByTestId('iframe-input-name');
    frameMessageInput = () => this.practiceFrame().getByLabel('Message');
    framePriorityDropdown = () => this.practiceFrame().getByLabel('Priority');
    urgentCheckbox = () => this.practiceFrame().getByLabel('Mark as urgent');
    frameSubmitButton = () => this.practiceFrame().getByRole('button', {name: 'Submit'});
    frameResetButton = () => this.practiceFrame().getByRole('button', {name: 'Reset'});
    frameSubmissionResult = () => this.practiceFrame().locator('.result');

    
    parentFrame = () => this.page.frameLocator('#parent-frame');
    parentFrameHeading = () => this.parentFrame().getByRole('heading', {name: 'Parent Frame'});
    parentFrameText = () => this.parentFrame().locator('#parent-frame-text');

    childFrame = () => this.parentFrame().frameLocator('#child-frame');
    childFrameHeading = () => this.childFrame().getByRole('heading', {name: 'Child Frame'});
    childNameInput = () => this.childFrame().getByLabel('Name');
    childMessageInput = () => this.childFrame().getByLabel('Message');
    childSubmitButton = () => this.childFrame().getByRole('button', {name: 'Submit'});
    childResetButton = () => this.childFrame().getByRole('button', {name: 'Reset'});
    childSuccessMessage = () => this.childFrame().locator('.result');
    acceptButton = () => this.page.getByRole('button', {name: 'Accept All'});

    // **************************************** Methods ***************************************

    async fillFrameForm(frameForm: {name: string, message: string, priority: string, urgent: boolean}) {
        await this.frameNameInput().fill(frameForm.name);
        await this.frameMessageInput().fill(frameForm.message);
        await this.framePriorityDropdown().selectOption({label: frameForm.priority});
        if (frameForm.urgent) {await this.urgentCheckbox().check();}
    }

    async submitFrameForm() {
        await this.frameSubmitButton().click();
    }

    async resetFrameForm() {
        await this.frameResetButton().click();
    }

    async scrollBackToMainPageSection() {
        await this.framesAndWindowsHeading().scrollIntoViewIfNeeded();
    }

        async getParentFrameText() {
        return await this.parentFrameText().textContent();
    }

    async fillChildFrameForm(name: string, message: string) {
        await this.childNameInput().fill(name);
        await this.childMessageInput().fill(message);
    }

    async submitChildFrameForm() {
        await this.childSubmitButton().click();
    }

    async resetChildFrameForm() {
        await this.childResetButton().click();
    }

    async getParentHeadingAfterChildFrameOperation() {
        return await this.parentFrameHeading().textContent();
    }

    async scrollToMainPageHeading() {
        await this.framesAndWindowsHeading()
            .scrollIntoViewIfNeeded();
    }

}