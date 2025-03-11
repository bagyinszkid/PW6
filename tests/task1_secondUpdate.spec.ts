import { test, expect } from './fixtures';

test('E2E', async ({ page, wikiArticle, wikiMainPage, context }) => {
    
    console.log(process.env.URL);
    await page.goto("" + process.env.URL);

    // #1 verification: Home page is loaded
    await expect(page).toHaveURL("" + process.env.MAINPAGEURL);
    
    // #2 header is expected and take a screenshot

    await wikiMainPage.wikiSearch('' + process.env.SEARCH, '' + process.env.QUERY);
    await page.getByRole("option").first().click();
    await expect(page.getByRole('heading', {name: '' + process.env.QUERY, exact: true })).toBeVisible();
    await wikiArticle.takeAShot();

    // #3 Edit: modal is shown

    await wikiArticle.pageEdit();
    await expect(page.getByRole('button', { name: '' + process.env.EDITLINK })).toBeVisible();
    
    // #4 modal is hidden and editing page is shown
   
    await page.getByRole('button', {name: '' + process.env.EDITLINK }).click();
    await expect(page.getByRole('button', {name: '' + process.env.EDITLINK })).not.toBeVisible();

    // #5 Help page opens in a new tab and its URL is expected
   
    await wikiArticle.pageHistory();
    const pagePromise = context.waitForEvent('page');
    await wikiArticle.pageHistoryHelp('' + process.env.HELP); 
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL('https://www.mediawiki.org/wiki/Help:History'); 
    await newPage.close();
    
   // #6 Appropriate article opens, take a screenshot
   
   await wikiArticle.navigateBack();
   await wikiArticle.wikiLanguageChange('' + process.env.LANGUAGEOPTION, '' + process.env.LANGUAGE);
   await wikiArticle.takeAShot();
   
 }
)