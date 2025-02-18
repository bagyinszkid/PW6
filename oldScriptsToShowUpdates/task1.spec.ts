import { test, expect } from '@playwright/test';

/*
Task 1: 
*/

test.describe('e2e', async () => {

  test.beforeEach( async ({ page }) => {

    await page.goto(process.env.URL);
  })

  test('1:home page is according to env', async ({ page }) => {
  
// expecting the env-based main page URL
// note: tried to find a common, non env-based solution, such as wiki-icon, didn't find option to assert it by scr tag 
// not needed per task, tests env selection for test initiation 

    await expect(page).toHaveURL(process.env.mainPageURL);
    
  });

  test('2:home page is loaded', async ({ page }) => {

// expecting the env-based main page Title 
    await expect(page).toHaveTitle(process.env.title);
    
  });

  test('3:query opened page', async ({ page }) => {
  
    //go to page from beforeHook
    // get search box and enter env-based query 
    
    let query = process.env.query;
    let placeholder = process.env.search;
    await page.getByPlaceholder(placeholder).fill(query);

    // select first 

    await page.getByRole("option").first().click();

    // expect header(?)

    expect(page.getByRole('heading', {name: process.env.query, exact: true})).toBeVisible();
    
    // create screenshot - disabled until building the case is finished
/*
    let now = Date.now();
    let envPic = process.env.envName;
    await page.screenshot({ path: `./screenshots/screenshot ${envPic} ${now}.png` });
*/
    // open Edit page, assert confirmation modal is opened

    await page.getByRole('link', { name: process.env.editLink, exact: true }).click();

    expect(page.getByLabel("tabindex")).toBeVisible();

    // confirm and assert that confirmation modal is hidden (no longer visible?)

    // open history and select help, assert that help page opened

    // navigate back to prev tab, select languange list: env-based, assert opening of new page

    // take a screenshot of opened page
    
  });
/*
  test('4:modal tests', async ({ page }) => {

    // next test comes here
    // copy-pasted from prev test
    // search and open env-based article
    // maybe not needed
        
    let query = process.env.query;
    let placeholder = process.env.search;
    await page.getByPlaceholder(placeholder).fill(query);
    await page.getByRole("option").first().click();



      });
      */
});

/*

Example tests: 

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/