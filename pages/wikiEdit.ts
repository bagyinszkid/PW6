import { type Page } from '@playwright/test';

export class wikiArticle {
    
    readonly page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async pageEdit() {
       this.page.locator('#ca-edit').click();
    }
    
    async takeAShot() {
        let now = Date.now();
        const env = process.env.EnvName as string
        await this.page.screenshot({ path: `./screenshots/screenshot ${env + "_" + now}.png` });
    }

    async pageHistory() {
        await this.page.locator('#ca-history').click();

    }

    async pageHistoryHelp(buttonName: string) {
        const header = this.page.locator('id=mw-indicator-mw-helplink');
        await header.getByRole('link', { name: buttonName, exact: true,  }).click();
    }

    async navigateBack() {
        await this.page.goBack()
        await this.page.goBack()
        await this.page.reload();
    }

    async wikiLanguageChange(placeholder: string, language: string) {
    // language param should be the native name and string of characters in the selected language
    // like selecting "Japanese" will be language=日本語
    // had to implement force:true on click because of this Bug: https://github.com/microsoft/playwright/issues/12298

        await this.page.locator('id=p-lang-btn').click();
        await this.page.getByPlaceholder(placeholder).fill(language)
        await this.page.getByRole('link', { name: language }).first().click({ force: true })
    }
}