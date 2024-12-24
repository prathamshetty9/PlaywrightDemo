import { expect, Browser, chromium, Page, BrowserContext, Locator } from "@playwright/test";
import test from "../../../pages/lamda-test/lamdaBasePage";



test("Browser Context Application. @LAMDA", async () => {

    const browser:Browser = await chromium.launch({headless : false, channel: 'chrome'});

    // Browser Context 1 - Having their own Session , Like running in incognito mode and having its own cookies , storage 
    const browserContext_1: BrowserContext = await browser.newContext();
    const page1:Page = await browserContext_1.newPage();

    // Browser Context 2 - Having their own Session , Like running in incognito mode and having its own cookies , storage 
    const browserContext_2: BrowserContext = await browser.newContext();
    const page2:Page = await browserContext_2.newPage();

    //browser 1 
    await page1.goto(`https://naveenautomationlabs.com/opencart/index.php?route=account/login`, {
        waitUntil: "domcontentloaded",
      });
    
     const emailId1:Locator = page1.locator('#input-email');
     const password1:Locator = page1.locator('#input-password');
     const loginBtn1:Locator = page1.locator("[value='Login']");
     const emailInputField:Locator = page1.getByRole('textbox', { name: 'E-Mail' });
     const editAccountInfo:Locator = page1.locator("//div[contains(@class,'row')]//a[contains(text(),'account information')]");

    // Admin Credentials 
     await emailId1.fill("adminuser123@abc.com");
     await password1.fill("Admin@1234");
     await loginBtn1.click();
     await editAccountInfo.click();
     expect(await emailInputField.inputValue()).toBe("adminuser123@abc.com");

    //browser 2
    await page2.goto(`https://naveenautomationlabs.com/opencart/index.php?route=account/login`, {
      waitUntil: "domcontentloaded",
    });
  
    const emailId2:Locator = page2.locator('#input-email');
    const password2:Locator = page2.locator('#input-password');
    const loginBtn2:Locator = page2.locator("[value='Login']");
    const emailInputField2:Locator = page2.getByRole('textbox', { name: 'E-Mail' });
    const editAccountInfo2:Locator = page2.locator("//div[contains(@class,'row')]//a[contains(text(),'account information')]");

    // User Credentials 
    await emailId2.fill("userpw@pw.com");
    await password2.fill("Test@123");
    await loginBtn2.click();
    await editAccountInfo2.click();
    expect(await emailInputField2.inputValue()).toBe("userpw@pw.com");
    

    //  await new Promise(()=>{});
});