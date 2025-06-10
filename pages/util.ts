import {Locator, type Page} from '@playwright/test';

export class util {

    readonly page: Page;
    //readonly selectLink: Locator;
    readonly pageHeader: Locator;
    readonly pageHeaderAfterChange: Locator;

    constructor (page: Page) {
        
        this.page = page;
        //this.selectLink = page.getByRole('link', {});
        this.pageHeader = page.getByRole('heading', { name: process.env.QUERY, exact: true });
        this.pageHeaderAfterChange = page.getByRole('heading', { name: process.env.QUERY_CHANGED, exact: true });
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

