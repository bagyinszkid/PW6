import { test as base } from '@playwright/test';
import { wikiMainPage } from '../pages/wikiMain';
import { wikiArticle } from '../pages/wikiEdit'

type MyFixtures = {
    wikiMainPage: wikiMainPage,
    wikiArticle: wikiArticle,
};

export const test = base.extend<MyFixtures>({
    wikiMainPage: async ({ page }, use) => {
        await use(new wikiMainPage(page))
    },
    wikiArticle: async ({ page }, use) => {
        await use(new wikiArticle(page))
    },
})

export { expect } from "@playwright/test"