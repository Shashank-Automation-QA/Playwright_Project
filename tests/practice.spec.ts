import { test, expect } from '@playwright/test';
import path from 'node:path';

test('TC_001 - Drag and Drop', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#draggable').dragTo(page.locator('#droppable'));
    await expect(page.locator('#droppable')).toContainText('Dropped!');
});

test('TC_003 - Single File Upload', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const filePath = path.resolve('test-data/shashank.txt');
    await page.locator('#singleFileInput').setInputFiles(filePath);
    await expect(page.locator('#singleFileInput'))
});

test('TC_004 - Multiple File Upload', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#miltipleFilesInput').setInputFiles(['test-data/shashank.txt','test-data/shashank1.txt']);
    await expect(page.locator('#singleFileInput'))
});

test.only('TC_005 - Download text file', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.locator('#inputText').fill('Shashank');

    const downloadPromise = page.waitForEvent('download');
        
    await page.getByRole('button', { name: 'Generate and Download Text File' }).click();
    await page.getByRole('link', { name: 'Download Text File' }).click();

    const download = await downloadPromise;
    // const target = path.join(test.info().outputDir,download.suggestedFilename())
    await download.saveAs(`downloads/${download.suggestedFilename()}`);
    // await download.saveAs(target);
    expect(download.suggestedFilename()).toMatch(/\.txt$/);
});


