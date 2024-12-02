import { expect, Locator, Page } from "@playwright/test";

export default class loginPage {
  page: Page;
  readonly homeLogo: Locator;
  readonly searchBar: Locator;
  readonly loginDropdown: Locator;
  readonly storeSelectButton: Locator;
  readonly profileIcon: Locator;
  readonly productWishlistIcon: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly myAccountDropdown: Locator;
  
  

  constructor(page: Page) {
    this.page = page;
    this.homeLogo = page.locator("//span[contains(text(),'Home')]/../parent::a");
    this.emailInput = page.locator("//input[contains(@id,'input-email')]");
    this.passwordInput = page.locator("//input[contains(@id,'input-password')]");
    this.loginBtn = page.locator("//input[contains(@value,'Login')]");
    this.myAccountDropdown = page.locator("//span[contains(text(),'My account')]/../parent::a[contains(@role,'button')]");
    this.loginDropdown = page.locator("//span[contains(text(),'Login')]");

  }

  getAccountOptions(text: string): Locator {
    return this.page.locator(
      `//span[contains(text(),'${text}')]`
    );
  }

  async clickOnHomeIcon() {
    await this.page.waitForLoadState("load");
    await this.homeLogo.click({ trial: true });
    await this.homeLogo.click();
  }

  async clickOnProfileIcon(accountOption : string) {
    await this.page.waitForLoadState("load");
    expect(this.myAccountDropdown.isVisible());
    await this.myAccountDropdown.click({ trial: true });
    await expect(this.loginDropdown).toBeVisible;
    this.getAccountOptions(accountOption).click();
  }

  async loginThroughEmailAndPassword(email: string, password: string) {
    this.clickOnProfileIcon('Login');
    await this.page.waitForLoadState("load");
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.loginBtn).toBeVisible();
    await this.loginBtn.click();
    await this.page.waitForLoadState("load");
  }

  
  


  }
