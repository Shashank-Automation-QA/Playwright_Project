import { Locator, Page } from "@playwright/test";
export class WindowAndTabPage {

    constructor(private page: Page) { }

    // **************************************** Locators ****************************************
    newTabLink = () => this.page.getByRole('link', {name: 'Open New Tab'});
    openWindowButton = () => this.page.locator('#openWindow');
    acceptButton = () => this.page.getByRole('button', {name: 'Accept All'});

    // **************************************** Methods ***************************************

    async openNewTaborWindow(tabOrWindowLink: Locator) {
    const newTabPromise = this.page.waitForEvent('popup');
    await tabOrWindowLink.click();
    const newTabOrWindow = await newTabPromise;
    await newTabOrWindow.waitForLoadState();
    return newTabOrWindow;
    }

}