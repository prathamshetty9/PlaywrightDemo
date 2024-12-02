import test from "../../pages/lamda-test/lamdaBasePage";
import { expect } from "@playwright/test";

test("checks for XSS vulnerability. @LAMDA", async ({
    page,
    loginPage
  }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/", {
        waitUntil: "domcontentloaded",
      });
    await loginPage.loginThroughEmailAndPassword(
        '<script>alert("XSS")</script>',
        '<script>alert("XSS")</script>'
    );
    const bodyContent = await page.content();
    expect(bodyContent).not.toContain('<script>alert("XSS")</script>');
  });