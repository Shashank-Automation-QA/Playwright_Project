import { Locator, Page } from "@playwright/test";
import path from "node:path";

export class PopupHandle {

    constructor(private page: Page) { }

    // **************************************** Locators ****************************************

    simpleAlertButton = () => this.page.getByRole('button', {name: 'Simple Alert'});
    confirmationAlertButton = () => this.page.getByRole('button', {name: 'Confirmation Alert'});
    promptAlertButton = () => this.page.getByRole('button', {name: 'Prompt Alert'});

    // **************************************** Methods ****************************************

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

    // async handleAlert(alertButton: Locator, inputText?: string) {
    //     const dialogPromise = this.page.waitForEvent('dialog');
    //     await alertButton.click();
    //     const dialog = await dialogPromise;
    //     const details = {type: dialog.type(), message: dialog.message()};
    //     await dialog.accept(inputText);
    //     return details;
    // }

}