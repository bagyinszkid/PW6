import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/*
  I've used "${process.env.ENV}'" before changing it to "+ process.env.ENV" because it didn't work 
  with either the offical way (using __dirname) or with the $ relative path;
  Found more information on dotenv and relative path: 
  https://dev.to/eriesgo/dotenv-and-relative-paths-fp2

*/
// currently dotenv config is unused, part of earlier attempt

dotenv.config({ 
 
  path: './env/.env.' + process.env.ENV,

});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    baseURL: 'https://en.wikipedia.org/wiki/Main_Page',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  */
    {
      name: 'qa-firefox',
      use: 
      { 
        baseURL: 'https://en.wikipedia.org/wiki/Main_Page',      
        trace: 'on-first-retry',
        browserName: 'firefox',
      },
    },
    {
      name: 'qa-safari',
      use: 
      { 
        baseURL: 'https://en.wikipedia.org/wiki/Main_Page',      
        trace: 'on-first-retry',
        browserName: 'webkit',
      },
    },
    {
      name: 'prod-firefox',
      use: 
      { 
        baseURL: 'https://hu.wikipedia.org/',
        trace: 'on-first-retry',
        browserName: 'firefox',
      }
    },
    {
      name: 'prod-safari',
      use: 
      { 
        baseURL: 'https://hu.wikipedia.org/',
        trace: 'on-first-retry',
        browserName: 'webkit',
      }
    },
    // project should use Chrome and Safari, branded or engine was not specified
    /*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
