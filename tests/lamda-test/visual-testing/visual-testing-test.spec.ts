import test from "../../../pages/lamda-test/lamdaBasePage";
import { expect } from "@playwright/test";

test('visual test', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    expect(await page.screenshot()).toMatchSnapshot('Screenshot.png');
  });