import { test, expect } from '../../pages/fixtures.ts';

// move these out ?
const baseURL = process.env.URL as string;
const languageOption = process.env.LANGUAGEOPTION as string;
const languageSelect = process.env.LANGUAGE as string;


test('E2E', async ({ page, wikiArticle, wikiMainPage, util, context, browserName }) => {
    
  // skip the browser = safari if ENV = PROD
  test.skip(process.env.ENVNAME === 'PROD' && browserName === 'webkit', 'skip safari on prod')


    await page.goto(baseURL);

    // #1 verification: Home page is loaded
   
    await expect(page.getByRole('link', { name: 'Wikidata', exact: true })).toBeVisible();
    
    // #2 header is expected and take a screenshot

    await wikiMainPage.wikiSearch(process.env.QUERY);
    await expect(page.getByRole('heading', {name: process.env.QUERY, exact: true })).toBeVisible();
    await util.takeAPic();

    // #3 Edit: modal is shown

    await wikiArticle.pageEdit();
    await expect(page.getByRole('button', { name: process.env.EDITLINK })).toBeVisible();
    
    // #4 Start Editing: modal is hidden and editing page is shown
   
    await wikiArticle.startEditingConfirm();
    await expect(page.getByRole('button', { name: process.env.EDITLINK })).not.toBeVisible();

    // #5 Help page opens in a new tab and its URL is expected
   
    await wikiArticle.pageHistory();
    const pagePromise = context.waitForEvent('page');
    await wikiArticle.openHistoryPageHelp(); 
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL('https://www.mediawiki.org/wiki/Help:History'); 
    await newPage.close();
    
   // #6 Appropriate article opens, take a screenshot

   await wikiArticle.navigateBack();
   await wikiArticle.wikiLanguageChange(languageOption, languageSelect);
   await expect(page.getByRole('heading', {name: process.env.QUERY, exact: true })).toBeVisible();
   await util.takeAPic();
   
 }
)