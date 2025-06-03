import {Locator, type Page} from '@playwright/test';

export class util {

    readonly page: Page;
    //readonly selectLink: Locator;

    constructor (page: Page) {
        
        this.page = page;
        //this.selectLink = page.getByRole('link', {});
    }

    async takeAPic() {
        let now = Date.now();
        const env = process.env.ENVNAME 
        await this.page.screenshot({ path: `./screenshots/screenshot ${env + "_" + now}.png` });
    }

    // hover feature to fix: 
    /*
    async popupOnHover(linkName) {
        await this.page.getByRole('link', { name: linkName, exact: true }).hover({ force: true });
        await this.page.locator('#mwe-popups-setting-button').click()
    }
    */

}

