import { expect, Locator, Page } from "@playwright/test";

export default class confirmOrderPage {
  page: Page;
  readonly confirmOrderBtn: Locator;
  readonly deleteIcon: Locator;
  readonly discoverProduct: Locator;
  
    

  constructor(page: Page) {
    this.page = page;
    this.confirmOrderBtn = page.getByRole('button', { name: /confirm/i });
    this.deleteIcon = page.getByRole('button', { name: /delete/i });
    this.discoverProduct = page.getByText('Continue');
  }

  

  async clickOnConfirmOrder() {
    await this.page.waitForLoadState("load");
    await this.confirmOrderBtn.click({ force: true });
  }
  



  }


