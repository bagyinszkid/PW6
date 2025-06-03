import { Locator, type Page } from '@playwright/test';

const searchTerm = process.env.SEARCH as string

export class wikiMainPage {

    readonly page: Page;
    readonly topPageSearch : Locator;
    readonly getFirstResult : Locator;

    constructor(page: Page) {

        this.page = page;
        this.topPageSearch = page.getByPlaceholder(searchTerm).first();
        this.getFirstResult = page.getByRole("option").first();
    }

    async gotoWikiMain() {
        await this.page.goto('');
    }
// had to assign .first() on the function, as the hungarian wikipedia had two results for this for some reason
    async wikiSearch(query) {
        await this.topPageSearch.fill(query);
        await this.getFirstResult.click();
    }
}