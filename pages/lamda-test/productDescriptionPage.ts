import { expect, Locator, Page } from "@playwright/test";

export default class pDPPage {
  page: Page;
  readonly bagIcon: Locator;
  readonly productNameTextLabel: Locator;
  readonly itemSize: Locator;
  readonly itemPrice: Locator;
  readonly addToBagButton: Locator;
  readonly toastMessage: Locator;
  readonly editCartBtn: Locator;
  readonly closeBtn: Locator;

  

  constructor(page: Page) {
    this.page = page;
    this.bagIcon = page.locator("(//div[contains(@class,'cart-icon')]/parent::a)[1]");
    this.productNameTextLabel = page.locator("//div[contains(@class,'content-title')]//h1");
    this.itemSize = page.locator("//div[contains(@class,'entry-row')]//input[contains(@name,'quantity')]");
    this.itemPrice = page.locator("//div[contains(@class,'entry-row ')]//div[@class='price']//h3");
    this.addToBagButton = page.locator("//div[contains(@class,'no-gutters')]//button[contains(text(),'Add to Cart')]");
    this.toastMessage = page.locator("//div[contains(@class,'toast-body')]//p");
    this.closeBtn = page.locator("//div[contains(@id,'notification-box-top')]//button[contains(@class,'close')]");
    this.editCartBtn =page.locator("//div[contains(@id,'cart-total-drawer')]//a[contains(@class,'icon-right') and text()=' Edit cart']");
  }

  async productValidation(productName: string) {
    await this.page.waitForLoadState("load");
    await this.productNameTextLabel.waitFor();
    expect(await this.productNameTextLabel.textContent()).toEqual(productName);
  }

  async enterProductQuantity(quantity: string) {
    await expect(this.itemSize).toBeVisible();
    await this.itemSize.fill(quantity);
  }

  async goToCart() {
    await this.addToBagButton.scrollIntoViewIfNeeded();
    await this.closeBtn.click();
    await this.page.waitForLoadState("load");
    await this.page.keyboard.press("PageUp");
    await this.bagIcon.waitFor();
    await this.bagIcon.click({ trial: true });
    await this.bagIcon.click();
    await expect(this.editCartBtn).toBeVisible();
    await this.editCartBtn.click();
  }

  async addToBag(productQuanity: string) {
    await this.page.waitForLoadState("load");
    this.enterProductQuantity(productQuanity);
    await this.addToBagButton.waitFor();
    await this.addToBagButton.scrollIntoViewIfNeeded();
    await expect(this.addToBagButton).toBeVisible();
    await this.addToBagButton.waitFor();
    await this.addToBagButton.click({ trial: true });
    await this.addToBagButton.click();
  }

  
}
