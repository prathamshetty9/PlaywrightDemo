import { test as baseTest } from "@playwright/test";
import homePage from "./homePage";
import pDPPage from "./productDescriptionPage";
import cartPage from "./cartPage";
import loginPage from "./loginPage";
import checkoutPage from "./checkoutPage";
import confirmOrderPage from "./confirmOrderPage";
import plpPage from "./productListingPage";
// import "dotenv/config";

// Utility functions
const isHash = (entity: any) =>
  Boolean(entity && typeof entity === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash: any, keys: string[]) =>
  keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = (val: any) => val === undefined || val === null || val === "";
const evaluateSessionStatus = (status: string | undefined) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
};

// Extending baseTest to include custom fixtures
const test = baseTest.extend<{
  homePage: homePage;
  loginPage: loginPage;
  productListingPage: plpPage;
  cartPage: cartPage;
  productDescriptionPage: pDPPage;
  checkoutPage: checkoutPage;
  confirmOrderPage: confirmOrderPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new homePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new loginPage(page));
  },
  productListingPage: async ({ page }, use) => {
    await use(new plpPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new cartPage(page));
  },
  productDescriptionPage: async ({ page }, use) => {
    await use(new pDPPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new checkoutPage(page));
  },
  confirmOrderPage: async ({ page }, use) => {
    await use(new confirmOrderPage(page));
  },
});

export default test;
export const expect = test.expect;
