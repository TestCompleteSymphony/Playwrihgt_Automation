// @ts-check
import { defineConfig, devices } from '@playwright/test';

import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/tests/featureFiles/**/*.feature',
  steps: 'src/tests/steps/*.js',
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 50 * 1000, // 30 seconds per test
  expect: {
    timeout: 10000 // 5 seconds for expect() by default
  },
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // @ts-ignore
  reporter: [['list'],['html', { outputFolder: 'playwright-report', open: 'never' }],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        screenshot:'only-on-failure',
        viewport: { width: 1920, height: 1080 },
      },
      //testMatch: /auth.setup.js/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        storageState: "src/tests/playwright/.auth/user.json",
        screenshot:'only-on-failure'
      },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

