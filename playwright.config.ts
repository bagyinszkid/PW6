import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
import path from "path"; 

dotenv.config({
  path: path.resolve(__dirname, `./env/.env.${process.env.ENV}`),
})
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
    // browserName: 'webkit',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'chrome',
      // testMatch: /.*task1_secondUpdate.spec.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      // testMatch: /.*task1_secondUpdate.spec.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'API',
      // testMatch: /.*API.spec.ts/,
      use: {
        baseURL: 'https://reqres.in/api',
        extraHTTPHeaders: {
          'x-api-key': `reqres-free-v1`,
        },
      },
    },

  ],
});
