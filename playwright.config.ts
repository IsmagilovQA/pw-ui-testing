import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

export default defineConfig<TestOptions>({
  // timeout: 10000, // Test timeout (default is 30000 mc)
  // globalTimeout: 60000, // Global timeout (no timeout by default)
  // expect: {
  //   timeout: 2000 // Expect timeout (default is 5000 mc)
  // },

  fullyParallel: false, // it related of parrallel running within spec file. If false - it will run within spec file sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // set retry globaly
  workers: process.env.CI ? 1 : undefined, // related to workers. One separate worker per each spec file. In underfined - pw will create max workers that possible for my PC
  reporter: 'html',
  use: {
    // screenshot: 'only-on-failure', // set screenshot globaly
    // video: 'retain-on-failure', // set video globaly
    // video: {
    //   mode: 'on',
    //   size: { width: 1920, height: 1080 } // video with any resolution (full HD as example here)
    // },

    baseURL: 'http://localhost:4200',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
    // actionTimeout: 5000, // Action timeout (no timeout by default)
    // navigationTimeout: 5000, // Navigation timeout (no timeout by default)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200',
        globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop',
        storageState: '.auth/user.json'
      },

      // fullyParallel: true  - in case you want to configure parallel execution inside project
    },

    {
      name: 'setup',
      testMatch: 'auth.setup.ts'
    },

    {
      name: 'articleSetup',
      testMatch: 'newArticle.setup.ts',
      dependencies: ['setup'],
      teardown: 'articleCleanUp'
    },

    {
      name: 'articleCleanUp',
      testMatch: 'articleCleanUp.setup.ts'
    },

    {
      name: 'likeCounter',
      testMatch: 'likesCounter.spec.ts',
      use: { browserName: 'chromium', storageState: '.auth/user.json' },
      dependencies: ['articleSetup']
      // fullyParallel: true  - in case you want to configure parallel execution inside project
    },

    {
      name: 'regression',
      use: { browserName: 'chromium', storageState: '.auth/user.json' },
      dependencies: ['setup']
      // fullyParallel: true  - in case you want to configure parallel execution inside project
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     storageState: '.auth/user.json'
    //   },
    //   dependencies: ['setup']
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
    //   dependencies: ['setup']
    // },
  ],
});
