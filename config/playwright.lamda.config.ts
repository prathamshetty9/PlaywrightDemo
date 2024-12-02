import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";


const config: PlaywrightTestConfig = {
  testDir: "../tests/lamda-test",
  workers: 1,
  timeout: 120 * 1000,
  retries: 1,
  expect: {
    timeout: 20000,
  },
  fullyParallel: false,
  reporter: [
    ["html"],
    ["json", { outputFile: "../playwright-report/json-report.json" }],
    ["junit", { outputFile: "../playwright-report/junit-report.xml" }],
  ],
  use: {
    baseURL: process.env.ENV_URL || "https://ecommerce-playground.lambdatest.io/",
    headless: true,
    actionTimeout: 0,
    trace: "on",
    video: "on",
    screenshot: "on",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        permissions: ["clipboard-read", "clipboard-write"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
};

export default config;
