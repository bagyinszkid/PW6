import {type Page} from '@playwright/test';

export class util {

    readonly page: Page

    constructor (page: Page) {
        
        this.page = page

    }

    async takeAPic() {
        let now = Date.now();
        const env = process.env.ENVNAME 
        await this.page.screenshot({ path: `./screenshots/screenshot ${env + "_" + now}.png` });
    }

}

