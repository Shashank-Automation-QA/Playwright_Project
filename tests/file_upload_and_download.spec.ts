import { test, expect } from "@playwright/test";
import { FileUploadDownload } from "../pages/file_upload_and_download";
import testData from "../test-data/file_upload_and_download.json";
import { CommonUtils } from "../Utils/CommonUtils";

test.describe('File Upload And Download', () => {

    let fileUploadDownloadPage: FileUploadDownload;
    let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ page }) => {
        fileUploadDownloadPage = new FileUploadDownload(page);
        CommonUtilsPage = new CommonUtils(page);
    });
    
    test('TC_001 - Single File Upload @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await fileUploadDownloadPage.uploadSingleFile(testData.files.singleFile);
        await expect(fileUploadDownloadPage.singleFileStatus()).toContainText(`Single file selected: ${testData.files.singleFile}`);
    });

    test('TC_002 - Multiple File Upload @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await fileUploadDownloadPage.uploadMultipleFiles(testData.files.multipleFiles);
        for (const file of testData.files.multipleFiles) {
            await expect(fileUploadDownloadPage.multipleFileStatus()).toContainText(file);
        }
    });

    test('TC_003 - Download Text File @smoke', async () => {
        await CommonUtilsPage.openApplication(testData.urls.downloadPage);
        const download = await fileUploadDownloadPage.downloadTextFile(testData.download.text);
        expect(download.suggestedFilename()).toMatch(/\.txt$/);
    })

});