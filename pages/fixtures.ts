import { test as base } from '@playwright/test';
import { wikiMainPage } from './wikiMainPage';
import { wikiArticle } from './wikiArticlePage'
import { util } from './util';

type MyFixtures = {
    wikiMainPage: wikiMainPage,
    wikiArticle: wikiArticle,
    util: util,
};

export const test = base.extend<MyFixtures>({
    wikiMainPage: async ({ page }, use) => {
        await use(new wikiMainPage(page))
    },
    wikiArticle: async ({ page }, use) => {
        await use(new wikiArticle(page))
    },
    util: async ({ page }, use) => {
        await use(new util(page))
    },
})

export { expect } from "@playwright/test"