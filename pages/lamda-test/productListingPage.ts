import { expect, Locator, Page } from "@playwright/test";

export default class plpPage {
  page: Page;
  readonly homeLogo: Locator;
  readonly searchBar: Locator;
  readonly productNamecards: Locator;
  readonly storeSelectButton: Locator;
  readonly profileIcon: Locator;
  readonly productWishlistIcon: Locator;

  
  

  constructor(page: Page) {
    this.page = page;
    this.productNamecards = page.locator("(//a[contains(@class,'text-ellipsis')])");
  }

  async clickOnHomeIcon() {
    await this.page.waitForLoadState("load");
    await this.homeLogo.click({ trial: true });
    await this.homeLogo.click();
  }


  async clickOnProfileIcon() {
    await this.page.waitForLoadState("load");
    await this.profileIcon.click({ trial: true });
    expect(this.profileIcon.isVisible());
    await this.profileIcon.click();
  }

  


  }
