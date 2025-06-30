import { Locator, type Page } from '@playwright/test';

const articleURL = process.env.ARTICLE_URL as string;

export class wikiArticle {
    
    readonly page: Page;
    readonly editArticleButton : Locator;
    readonly historyOfArticeButton : Locator;
    readonly historyPageHelp : Locator;
    readonly editStartButton : Locator;
    readonly languageSelector : Locator;
    readonly languageSelectorButton: Locator;
    readonly languageSelectorButtonName: Locator;

    constructor(page: Page) {

        this.page = page;
        this.editArticleButton = page.locator('#ca-edit');
        this.historyOfArticeButton = page.locator('#ca-history');
        this.historyPageHelp = page.locator('id=mw-indicator-mw-helplink').getByRole('link', { name: process.env.HELP, exact: true });
        this.languageSelector = page.locator('id=p-lang-btn');
        this.editStartButton = page.getByRole('button', { name: process.env.EDITLINK });
        this.languageSelectorButton = page.getByPlaceholder( process.env.LANGUAGEOPTION! );
        this.languageSelectorButtonName = page.getByRole('link', { name: process.env.LANGUAGE! }).first();
    }

    async pageEdit() {
       await this.editArticleButton.click();
    }

    async pageHistory() {
        await this.historyOfArticeButton.click();
    }

    async openHistoryPageHelp() {
        await this.historyPageHelp.click();
    }

    async navigateBack() {
        await this.page.goto(articleURL);
    }

    async wikiLanguageChange() {
    // language param should be the native name and string of characters in the selected language
    // like selecting "Japanese" will be language=日本語
    // had to implement force:true on click because of this Bug: https://github.com/microsoft/playwright/issues/12298
    // placeholder - process.env.LANGUAGEOPTION! language - process.env.LANGUAGE!
        await this.languageSelector.click();
        await this.languageSelectorButton.fill( process.env.LANGUAGE! )
        await this.languageSelectorButtonName.click({ force: true })
    }

    async startEditingConfirm() {
        await this.page.getByRole('button', { name: process.env.EDITLINK }).click();
    }

}