import { Locator, type Page } from '@playwright/test';

// const search = process.env.SEARCH as string

export class wikiMainPage {

    readonly page: Page;
  /*  readonly topPageSearch : Locator;
    readonly getFirstResult : Locator;*/

    constructor(page: Page) {

        this.page = page;
    /*    this.topPageSearch = page.getByPlaceholder(search).first();
        this.getFirstResult = page.getByRole("option").first();*/
    }

// had to assign .first() on the function, as the hungarian wikipedia had two results for this for some reason
    async wikiSearch( query ) {
        await this.page.getByPlaceholder(process.env.SEARCH!).first().fill( query );
        await this.page.getByRole("option").first().click();
    }
}