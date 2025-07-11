import { Locator, type Page } from '@playwright/test';

export class wikiArticle {
    
    readonly page: Page;
    readonly editArticleButton : Locator;
    readonly historyOfArticeButton : Locator;
    readonly historyPageHelp : Locator;
    readonly editStartButton : Locator;
    readonly languageSelector : Locator;
    readonly languageSearchField: Locator;
    readonly languageSearchResult: Locator;
    readonly pageHeaderAfterChange: Locator;

    constructor(page: Page) {

        this.page = page;
        this.editArticleButton = page.locator('#ca-edit');
        this.historyOfArticeButton = page.locator('#ca-history');
        this.historyPageHelp = page.locator('id=mw-indicator-mw-helplink').getByRole('link', { name: process.env.HELP, exact: true });
        this.editStartButton = page.getByRole('button', { name: process.env.EDITLINK });
        
        this.languageSelector = page.locator('id=p-lang-btn');
        this.languageSearchField = page.getByPlaceholder( process.env.LANGUAGEOPTION! );
        this.languageSearchResult = page.getByRole('link', { name: process.env.LANGUAGE! }).first();

        this.pageHeaderAfterChange = page.getByRole('heading', { name: process.env.QUERY_CHANGED, exact: true });
    }

    async changeArticleLanguage() {
    // language param should be the native name and string of characters in the selected language
    // e.g.: selecting "Japanese" will be language=日本語
    // had to implement force:true on click because of this Bug: https://github.com/microsoft/playwright/issues/12298
    // placeholder - process.env.LANGUAGEOPTION! language - process.env.LANGUAGE!
        await this.languageSelector.click();
        await this.languageSearchField.fill( process.env.LANGUAGE! )
        await this.languageSearchResult.click({ force: true })
    }

}