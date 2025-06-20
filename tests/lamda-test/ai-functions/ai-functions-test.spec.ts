import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

const username = 'testingplaywright@abc.com';
const password = 'Test@1234';
const profileURL = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/account'

test('Login and navigate to user profile', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  await ai(`Log in with username ${username} and password ${password}`, { page, test });
  await ai(`Navigate to the user profile without clicking on any links and only verify the url to be ${profileURL}`, { page, test });
});



/*  
Manual Eqivalent of the program 

test('Login and go to user profile', async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('#loginButton');
    await page.fill('#username', 'testUser');
    await page.fill('#password', 'securePassword');
    await page.click('#submitLogin');
    await page.click('#profileMenu');
    await page.click('#userProfile');
    await expect(page).toHaveURL('https://example.com/user/testUser');
  });


  we can also perform tasks like the below statements in a single call

  await ai(`
  Log in with username admin and password admin123.
  Navigate to the dashboard.
  Verify the welcome message is visible.
`);


  */