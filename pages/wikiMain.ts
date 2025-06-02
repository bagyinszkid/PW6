import { type Page } from '@playwright/test';

export class wikiMainPage {
    readonly page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async gotoWikiMain() {
        await this.page.goto('');
    }
// had to assign .first() on the function, as the hungarian wikipedia had two results for this for some reason
    async wikiSearch(placeholder, query) {
        await this.page.getByPlaceholder(placeholder).first().fill(query);
    }
}