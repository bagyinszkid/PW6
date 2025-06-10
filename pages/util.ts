import {Locator, type Page} from '@playwright/test';

export class util {

    readonly page: Page;
    readonly pageHeader: Locator;
    readonly pageHeaderAfterChange: Locator;

    constructor (page: Page) {
        
        this.page = page;
        this.pageHeader = page.getByRole('heading', { name: process.env.QUERY, exact: true });
        this.pageHeaderAfterChange = page.getByRole('heading', { name: process.env.QUERY_CHANGED, exact: true });
    }

    async takeAPic() {
        let now = Date.now();
        const env = process.env.ENVNAME 
        await this.page.screenshot({ path: `./screenshots/screenshot ${env + "_" + now}.png` });
    }

}

