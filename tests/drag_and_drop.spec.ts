// import { test, expect } from "@playwright/test";
import { DragAndDrop } from "../pages/drag_and_drop";
// import testData from "../test-data/practice.json";
// import { CommonUtils } from "../Utils/CommonUtils";
import { testApp as test, expect } from "../fixtures/testfixture";

test.describe('Drag And Drop', () => {

    let DragAndDropPage: DragAndDrop;
    // let CommonUtilsPage: CommonUtils;

    test.beforeEach(async ({ fixturePage: page }) => {
        DragAndDropPage = new DragAndDrop(page);
        // CommonUtilsPage = new CommonUtils(page);
    });

    test('TC_001 - Drag And Drop @smoke', async () => {
        // await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await DragAndDropPage.performDragAndDrop();
        await expect(DragAndDropPage.droppable()).toContainText('Dropped!');
    })
});