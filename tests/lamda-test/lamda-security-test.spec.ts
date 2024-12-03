import test from "../../pages/lamda-test/lamdaBasePage";
import { expect, Browser, chromium, Page, BrowserContext, Locator } from "@playwright/test";

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


  test("CSRF Vulneribility Application.", async () => {

    const browser:Browser = await chromium.launch({headless : false, channel: 'chrome'});

    // Browser Context 1 - Having their own Session , Like running in incognito mode and having its own cookies , storage 
    const browserContext: BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    try{
      const endpoint = 'https://reqres.in/api/comments';
      const csrfPayload = 'malicious-token';

      const response = await page.request.post( endpoint, {
          headers: {
            'CSRF-token': csrfPayload,
            'Content-Type': 'application/json',
          },
          data : {
              title : 'New Post',
              body : 'This is a new Post',
              userId : 1
          }

        }
      );

      const responseBody = await response.json();
      console.log("CSRF Test Response ", responseBody);

      if( !responseBody.error){
          throw new Error(' Potential CSRF Vulneribility detected ');
      }

    }catch(error){
      console.log(" API Execution Error", error);
    }finally{
      await browser.close();
    }
    
});


test("SQL Injection Application.", async () => {

  const browser:Browser = await chromium.launch({headless : false, channel: 'chrome'});

  // Browser Context 1 - Having their own Session , Like running in incognito mode and having its own cookies , storage 
  const browserContext: BrowserContext = await browser.newContext();
  const page:Page = await browserContext.newPage();

    const endpoint = 'https://reqres.in/api/comments';
    const sqlInjectionPayload = "' OR '1'='1'";

    const response = await page.request.post( endpoint, {
        data : {
            userame : sqlInjectionPayload,
            password : 'any_password',
        }

      }
    );

    const responseBody = await response.json();
    console.log("SQL Injection Test Response ", responseBody);

    if(responseBody.error){
        throw new Error(' SQL Injection Vulneribility Test Failed ');
    }else {
      throw new Error(' Potential SQL Injection Vulneribility detected ');
    }

  
});