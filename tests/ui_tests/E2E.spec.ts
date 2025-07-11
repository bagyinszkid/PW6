import { test, expect } from '../../pages/fixtures.ts';

test('E2E', async ({ page, wikiArticle, wikiMainPage, util, context, browserName }) => {
    
  // skip the browser = safari if ENV = PROD
  test.skip(process.env.ENVNAME === 'PROD' && browserName === 'webkit', 'skip safari on prod')

    await page.goto(process.env.URL!);

    // #1 verification: Home page is loaded
   
    await expect(wikiMainPage.wikiDataPortal).toBeVisible();
    
    // #2 header is expected and take a screenshot

    await wikiMainPage.searchOnWiki();
    await expect(wikiMainPage.pageHeader).toBeVisible();
    await util.takeAPic();

    // #3 Edit: modal is shown

    await wikiArticle.editArticleButton.click();
    await expect(wikiArticle.editStartButton).toBeVisible();
    
    // #4 Start Editing: modal is hidden and editing page is shown
   
    await wikiArticle.editStartButton.click();
    await expect(wikiArticle.editStartButton).not.toBeVisible();

    // #5 Help page opens in a new tab and its URL is expected
   
    await wikiArticle.historyOfArticeButton.click();
    const pagePromise = context.waitForEvent('page');
    await wikiArticle.historyPageHelp.click(); 
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(process.env.HISTORYPAGE!); 
    await newPage.close();
    
   // #6 Navigate back, Appropriate article opens, take a screenshot

   await wikiArticle.page.goto(process.env.ARTICLE_URL!);
   await wikiArticle.changeArticleLanguage();
   await expect(wikiArticle.pageHeaderAfterChange).toBeVisible();
   await util.takeAPic();
   
 }
)