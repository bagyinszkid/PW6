import { test, expect } from './fixtures';

/*
Task 1: 
*/

test.describe('Updated and cleaned E2E', async () => {

  test.beforeEach( async ({ wikiMainPage }) => {

    await wikiMainPage.gotoWikiMain();

  });

  test('0:Home page is loaded @qa', async ({ page }) => {
    
      await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
    
    });

  test('0:Home page is loaded @prod', async ({ page }) => {
    
      await page.goto('https://hu.wikipedia.org/');

      await expect(page).toHaveURL('https://hu.wikipedia.org/wiki/Kezd%C5%91lap');
  
  });

  test('1: Page is loaded @qa @prod', async ({ page }) => {

    await expect(page.locator('#vector-user-links-dropdown-checkbox')).toBeVisible();

  })

  test('2: Search query, page opened @qa', async ({ page, wikiArticle, wikiMainPage, context }) => {
    
// 2: Search for [env specific] 'Playwright' and select first result
    await wikiMainPage.wikiSearch('Search Wikipedia', 'Playwright');
    await page.getByRole("option").first().click();

// Expect header    
    await expect(page.getByRole('heading', {name: 'Playwright', exact: true})).toBeVisible();

// take a screenshot : disabled while testing the code
    await wikiArticle.takeAShot();

// '3: Modal is visible on Edit 
// Select Edit
    await wikiArticle.pageEdit();
    

// modal visibility check using its button 

    await expect(page.getByRole('button', { name: 'Start editing' })).toBeVisible();
    await page.getByRole('button', { name: 'Start editing' }).click();
    await expect(page.getByRole('button', { name: 'Start editing' })).not.toBeVisible();

// 4: Open history and select: Help

await wikiArticle.pageHistory();
    
// Initiate new page
  const pagePromise = context.waitForEvent('page');

// Select link that opens new page
    await wikiArticle.pageHistoryHelp('Help');
    
// Catch new page  
  const newPage = await pagePromise;
   console.log(newPage.url());
  
// Assert that help page opened

await expect(newPage).toHaveURL('https://www.mediawiki.org/wiki/Help:History');

// 5: Go back, change language to env specific one
// close new page

await newPage.close();

// navigate back to Read (not menu item) - going back [await page.goBack();] does not change from edit to read, refresh sets back menu selection 

await wikiArticle.navigateBack();

// change language to: native/ JP 

await wikiArticle.wikiLanguageChange('Search for a language', 'Magyar');

// take a screenshot

await wikiArticle.takeAShot();
    
  }); 
// end of qa version of test 2

  test('2: Search query, page opened @prod', async ({  page, wikiArticle, wikiMainPage, context }) => {
    
// 2: Search for [env specific] 'Playwright' and select first result
    await page.goto('');
    await wikiMainPage.wikiSearch('Keresés a Wikipédián', 'Drámaíró');
    await page.getByRole("option").first().click();

// Expect header 
    await expect(page.getByRole('heading', {name: 'Drámaíró', exact: true})).toBeVisible();

// take a screenshot : disabled while testing the test code
    await wikiArticle.takeAShot();

// 3:Modal is visible on clicking Edit, then goes away
// Select Edit

    await wikiArticle.pageEdit();

// Modal is shown
    await expect(page.getByRole('button', { name: 'Szerkesztés elkezdése' })).toBeVisible();
    await page.getByRole('button', { name: 'Szerkesztés elkezdése' }).click();

// Modal is hidden
    await expect(page.getByRole('button', { name: 'Szerkesztés elkezdése' })).not.toBeVisible();

// 4: Open history and select: Help

    await wikiArticle.pageHistory();
    
// Initiate new page
  const pagePromise = context.waitForEvent('page');

// Select link that opens new page
    await wikiArticle.pageHistoryHelp('Segítség');
    
// Catch new page  
  const newPage = await pagePromise;
   console.log(newPage.url());
  
// Assert that help page opened

await expect(newPage).toHaveURL('https://www.mediawiki.org/wiki/Help:History');

// 5: Go back, change language to env specific one
// close new page

await newPage.close();

// navigate back to Read (not menu item) - going back [await page.goBack();] does not change from edit to read, refresh sets back menu selection 

await wikiArticle.navigateBack();

// change language to: native/ JP 

await wikiArticle.wikiLanguageChange('Nyelv keresése', '日本語');

// take a screenshot

await wikiArticle.takeAShot();


  }); 

});
