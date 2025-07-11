import { Locator, type Page } from '@playwright/test';

// const search = process.env.SEARCH as string

export class wikiMainPage {

    readonly page: Page;
    readonly wikiDataPortal: Locator;
    readonly getSearchBar: Locator;
    readonly getFirstResult: Locator;
    readonly pageHeader: Locator;

    constructor(page: Page) {

        this.page = page;
        this.wikiDataPortal = page.getByRole('link', { name: 'Wikidata', exact: true });
        this.getSearchBar = page.getByPlaceholder(process.env.SEARCH!).first();
        this.getFirstResult = page.getByRole("option").first();
        this.pageHeader = page.getByRole('heading', { name: process.env.QUERY, exact: true });
        
    }

// had to assign .first() on the function, as the hungarian wikipedia had two results for this for some reason
    async searchOnWiki() {
        await this.getSearchBar.fill( process.env.QUERY! );
        await this.getFirstResult.click();
    }
}