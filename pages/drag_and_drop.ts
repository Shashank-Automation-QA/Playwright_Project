import { Locator, Page } from "@playwright/test";
import path from "node:path";

export class DragAndDrop {

    constructor(private page: Page) { }

    // **************************************** Locators ****************************************

    draggable = () => this.page.locator('#draggable');
    droppable = () => this.page.locator('#droppable');

    // **************************************** Methods ****************************************

    async performDragAndDrop() {
        await this.draggable().dragTo(this.droppable());
    }

};