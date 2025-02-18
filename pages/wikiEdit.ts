import { type Page } from '@playwright/test';

export class wikiArticle {
    
    readonly page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async pageEdit() {
       this.page.locator('#ca-edit').click();
    }
/* expecting the modal failed idea

    async editConfirmationDialog() {
        this.page.getByRole('dialog', { name: 'ooui-1' });
    }
*/
    async takeAShot() {
        let now = Date.now();
        // let envPic = process.env.envName; using ${envPic} in screenshotname -- when based on env variables, used this snippet to name the pic
        await this.page.screenshot({ path: `./screenshots/screenshot ${now}.png` });
    }

    async pageHistory() {
        await this.page.locator('#ca-history').click();

    }

    async pageHistoryHelp(buttonName: string) {
    //    await this.page.locator('#mw-helplink').click();
        await this.page.getByRole('link', { name: buttonName, exact: true  }).click();
    }

    async navigateBack() {
        await this.page.goBack()
        await this.page.goBack()
        await this.page.reload();
    }

    async wikiLanguageChange(placeholder: string, language: string) {
    // language param should be the native name and string of characters in the selected language
    // like selecting "Japanese" will be language=日本語

        await this.page.locator('id=p-lang-btn').click();
        await this.page.getByPlaceholder(placeholder).fill(language)
        await this.page.getByRole('link', { name: language }).first().click()
    }
}