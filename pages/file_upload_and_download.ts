import { Locator, Page } from "@playwright/test";
import path from "node:path";

export class FileUploadDownload {

    constructor(private page: Page) { }

// **************************************** Locators ****************************************

    singleFileInput = () => this.page.locator('#singleFileInput');
    uploadSingleFileButton = () => this.page.getByRole('button', {name: 'Upload Single File'});
    singleFileStatus = () => this.page.locator('#singleFileStatus');
    multipleFileInput = () => this.page.locator('#multipleFilesInput');
    multipleFileStatus = () => this.page.locator('#multipleFilesStatus');
    inputText = () => this.page.locator('#inputText');
    generateDownloadButton = () => this.page.getByRole('button', {name: 'Generate and Download Text File'});
    downloadTextLink = () => this.page.getByRole('link', {name: 'Download Text File'});


// **************************************** Methods ****************************************

async uploadSingleFile(fileName: string) {
    const filePath = path.join(process.cwd(),"test-data","test_Data_Files",fileName);
    await this.singleFileInput().setInputFiles(filePath);
    await this.uploadSingleFileButton().click();
}

async uploadMultipleFiles(fileNames: string[]) {
    const filePaths = fileNames.map(file =>path.join(process.cwd(), 'test-data',"test_Data_Files", file));
    await this.multipleFileInput().setInputFiles(filePaths);
}

async downloadTextFile(text: string) {
    await this.inputText().fill(text);
    const downloadPromise = this.page.waitForEvent('download');
    await this.generateDownloadButton().click();
    await this.downloadTextLink().click();
    return await downloadPromise;
}
};