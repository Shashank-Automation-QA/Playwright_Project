import { Page } from "@playwright/test";
import path from "node:path";

export class PracticePage {

    constructor(private page: Page) { }

    // **************************************** Locators ****************************************

    draggable = () => this.page.locator('#draggable');
    droppable = () => this.page.locator('#droppable');
    singleFileInput = () => this.page.locator('#singleFileInput');
    uploadSingleFileButton = () => this.page.getByRole('button', {name: 'Upload Single File'});
    singleFileStatus = () => this.page.locator('#singleFileStatus');
    multipleFileInput = () => this.page.locator('#multipleFilesInput');
    multipleFileStatus = () => this.page.locator('#multipleFilesStatus');
    inputText = () => this.page.locator('#inputText');
    generateDownloadButton = () => this.page.getByRole('button', {name: 'Generate and Download Text File'});
    downloadTextLink = () => this.page.getByRole('link', {name: 'Download Text File'});
    simpleAlertButton = () => this.page.getByRole('button', {name: 'Simple Alert'});
    confirmationAlertButton = () => this.page.getByRole('button', {name: 'Confirmation Alert'});
    promptAlertButton = () => this.page.getByRole('button', {name: 'Prompt Alert'});

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

    // **************************************** Methods ****************************************

    async performDragAndDrop() {
        await this.draggable().dragTo(this.droppable());
    }

    async uploadSingleFile(fileName: string) {
        const filePath = path.join(process.cwd(),"test-data",fileName);
        await this.singleFileInput().setInputFiles(filePath);
        await this.uploadSingleFileButton().click();
    }

    async uploadMultipleFiles(fileNames: string[]) {
        const filePaths = fileNames.map(file =>path.join(process.cwd(), 'test-data', file));
        await this.multipleFileInput().setInputFiles(filePaths);
    }

    async downloadTextFile(text: string) {
        await this.inputText().fill(text);
        const downloadPromise = this.page.waitForEvent('download');
        await this.generateDownloadButton().click();
        await this.downloadTextLink().click();
        return await downloadPromise;
    }

    async acceptSimpleAlert() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.simpleAlertButton().click();
        const dialog = await dialogPromise;
        const details = {type: dialog.type(), message: dialog.message()};
        await dialog.accept();
        return details;
    }

    async dismissConfirmationAlert() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.confirmationAlertButton().click();
        const dialog = await dialogPromise;
        const details = {type: dialog.type(), message: dialog.message()};
        await dialog.dismiss();
        return details;
    }

    async handlePromptAlert(inputText: string) {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.promptAlertButton().click();
        const dialog = await dialogPromise;
        const details = {type: dialog.type(), message: dialog.message()};
        await dialog.accept(inputText);
        return details;
    }

    async fillFrameForm(name: string, message: string, priority: string, urgent: boolean) {
        await this.frameNameInput().fill(name);
        await this.frameMessageInput().fill(message);
        await this.framePriorityDropdown().selectOption({
            label: priority
        });
        if (urgent) {await this.urgentCheckbox().check();}
    }
    
    async submitFrameForm() {
        await this.frameSubmitButton().click();
    }

    async resetFrameForm() {
        await this.frameResetButton().click();
    }
    /*
     * We don't need to switch back manually.
     * Using this.page automatically targets the main page.
     */
    async scrollBackToMainPageSection() {
        await this.framesAndWindowsHeading().scrollIntoViewIfNeeded();
    }

}