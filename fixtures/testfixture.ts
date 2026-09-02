import {test as base, expect, Page} from '@playwright/test';
import testData from "../test-data/practice.json";
import { CommonUtils } from "../Utils/CommonUtils";
// import { url } from 'node:inspector';

type AppFixtures = { fixturePage : Page; };

export const testApp = base.extend<AppFixtures>({
    fixturePage: async({page}, use)=>{
        let CommonUtilsPage: CommonUtils;
        CommonUtilsPage = new CommonUtils(page);
        await CommonUtilsPage.openApplication(testData.urls.practicePage);
        await use(page);
    },
});

export {expect};