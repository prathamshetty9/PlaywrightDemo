import { expect, Locator, Page } from "@playwright/test";

export default class cartPage {
  page: Page;
  readonly cartIcon: Locator;
  readonly deleteIcon: Locator;
  readonly discoverProduct: Locator;
  readonly editCartBtn: Locator;
  readonly productWishlistIcon: Locator;
  readonly totalPriceTextLabel: Locator;
  readonly proceedToCheckoutButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator("(//div[contains(@class,'cart-icon')]/parent::a)[1]");
    this.deleteIcon = page.locator("//button[contains(@class,'btn btn-danger')]");
    this.discoverProduct =page.locator("//a[contains(text(),'Continue')]");
    this.editCartBtn =page.locator("//div[contains(@id,'cart-total-drawer')]//a[contains(@class,'icon-right') and text()=' Edit cart']");
    this.proceedToCheckoutButton =page.locator("//div[contains(@class,'buttons')]//a[contains(text(),'Checkout')]");
    this.totalPriceTextLabel =page.locator("//div[contains(@class,'col-md')]//td[text()='Total:']/following-sibling::td");
  }

  

  async emptyCart() {
    await this.page.waitForLoadState("load");
    await this.cartIcon.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.editCartBtn).toBeVisible();
    await this.editCartBtn.click();
    await this.page.waitForLoadState("load");
    if (await this.deleteIcon.first().isVisible()) {
      await this.deleteIcon.first().scrollIntoViewIfNeeded();
      var deleteIconCount = (await this.deleteIcon.count()) / 2;
      console.log(deleteIconCount);
      for (let i = 0; i <= deleteIconCount; i++) {
        await this.deleteIcon.nth(i).click();
        await this.page.waitForLoadState();
        await this.page.reload();
      }
    }
    await expect(this.discoverProduct).toBeVisible();
    await this.discoverProduct.click();
  }
  

  async proceedToCheckout() {
    await this.page.waitForLoadState("load");
    var totalPrice: any = (
      await this.totalPriceTextLabel.textContent()
    )?.trim();
    await this.proceedToCheckoutButton.waitFor({ state: "visible" });
    await this.proceedToCheckoutButton.click({ trial: true });
    await this.proceedToCheckoutButton.click();
    return totalPrice;
  }


  }
