import { test, expect } from '@playwright/test';
import path, { join } from 'node:path';
import { cwd } from 'node:process';

test('TC_001 - Drag and Drop', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Below code for drag and drop
    //we preffer this aproach because this is locator base and locator can be save as vriable in POM model but below one we are not using locator
    await page.locator('#draggable').dragTo(page.locator('#droppable'));  
                    // OR
    await page.dragAndDrop('#draggable','#droppable');

    await expect(page.locator('#droppable')).toContainText('Dropped!');
});

test('TC_003 - Single File Upload', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const fileName = 'sample.txt';

    // Below code is for file path
    const filePath = path.join(process.cwd(),"test-data", fileName);
                        // OR
    // const filePath = path.resolve(`test-data/${fileName}`);

    // Below code is for uploading file
    await page.locator('#singleFileInput').setInputFiles(filePath);


    await page.getByRole('button', { name: 'Upload Single File' }).click();
    await expect(page.locator('#singleFileStatus')).toBeVisible();
    await expect(page.locator('#singleFileStatus')).toContainText(`Single file selected: ${fileName}`)
});

test('TC_004 - Multiple File Upload', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const fileName1 = 'sample.txt'
    const fileName2 = 'pdfsample.pdf'
    const filePath = join(process.cwd(), "test-data")
    await page.locator('#multipleFilesInput').setInputFiles([`${filePath}/${fileName1}`, `${filePath}/${fileName2}`]);
    await expect(page.locator('#multipleFilesInput')).toBeVisible();
    await page.pause()
    await expect(page.locator('#multipleFilesStatus')).toContainText("sample.txt")
    await expect(page.locator('#multipleFilesStatus')).toContainText("pdfsample.pdf")

});

test('TC_005 - Download text file', async ({ page }) => {
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

test.only('TC_006 - Accept Popup', async ({ page }) => {
    // step1
    await page.goto('https://testautomationpractice.blogspot.com/');

    // step 3  once is a listner it will wait for step 2 to complete
    page.once('dialog', async dialog => {
        expect.soft(dialog.type()).toBe('I am an alert box!');
        await dialog.accept();
    });

    // step2
    await page.getByRole('button', {name: 'Simple Alert'}).click();
    
});

test('TC_007 - Cancle Popup', async ({ page }) => {
    // step1
    await page.goto('https://testautomationpractice.blogspot.com/');

    // step 3  once is a listner it will wait for step 2 to complete
    page.once('dialog', async dialog => {
        expect.soft(dialog.type()).toBe('Press a button!');
        await dialog.dismiss();
    });

    // step2
    await page.getByRole('button', {name: 'Confirmation Alert'}).click();
    
});

test('TC_008 - Enter data in popup and click on ok button', async ({ page }) => {
    // step1
    await page.goto('https://testautomationpractice.blogspot.com/');

    // step 3  once is a listner it will wait for step 2 to complete
    page.once('dialog', async dialog => {
        expect.soft(dialog.type()).toBe('I am an alert box!');
        await dialog.accept("Hi....");
    });

    // step2
    await page.getByRole('button', {name: 'Prompt Alert'}).click();
    
});
