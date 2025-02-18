import { defineConfig, devices } from '@playwright/test';

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
  ],
});
