import { expect, Locator, Page } from "@playwright/test";

export default class orderHistoryPage {
  page: Page;
  readonly orderIds: Locator;
  readonly orderStatus: Locator;
  readonly viewDetailsButton: Locator;
  readonly shipmentId: Locator;
  readonly cancelButton: Locator;
  readonly totalPriceTextLabel: Locator;
  readonly myAccountDropdown: Locator;
  
  

  constructor(page: Page) {
    this.page = page;
    this.page = page;
    this.orderStatus = page.locator('//div[@class="status"]');
    this.orderIds = page.locator('//span[@class="order-id"]');
    this.viewDetailsButton = page.locator("//div[contains(@id,'account-order')]//tbody//tr[1]//td/a");
    this.myAccountDropdown = page.locator("//span[contains(text(),'My account')]/../parent::a[contains(@role,'button')]");
  }

  getAccountOptions(text: string): Locator {
    return this.page.locator(
      `//span[contains(text(),'${text}')]`
    );
  }

  async clickOnProfileIcon(accountOption : string) {
    await this.page.waitForLoadState("load");
    expect(this.myAccountDropdown.isVisible());
    await this.myAccountDropdown.click({ trial: true });
    await expect(this.getAccountOptions(accountOption)).toBeVisible;
    this.getAccountOptions(accountOption).click();
  }

  

  


  }
