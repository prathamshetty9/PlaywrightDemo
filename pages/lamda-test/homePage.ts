import { expect, Locator, Page } from "@playwright/test";
import * as fs from "fs";

export default class homePage {
  page: Page;
  readonly homeLogo: Locator;
  readonly searchBar: Locator;
  readonly firstProduct: Locator;
  readonly productNamecards: Locator;
  readonly sortByButton: Locator;
  readonly sortOption: Locator;
  readonly productPriceCards: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.homeLogo = page.locator("//span[contains(text(),'Home')]");
    this.searchBar = page.locator("(//input[contains(@placeholder,'Search For Products')])[1]");
    this.firstProduct = page.locator("(//a[contains(@id,'mz-product-grid-image')])[2]");
    this.productNamecards = page.locator("(//a[contains(@class,'text-ellipsis')])");
    this.sortByButton = page.locator("(//select[contains(@id,'input-sort')])[1]");
    this.sortOption = page.locator("(//option[contains(text(),'Price (Low > High)')])[2]");
    this.productPriceCards = page.locator("//div[contains(@class,'content-products')]//div[contains(@class,'price')]//span");
  }

  async clickOnHomeIcon() {
    await this.page.waitForLoadState("load");
    await this.homeLogo.click({ trial: true });
    await this.homeLogo.click();
  }


  async searchingForProduct(productName : string) {
    await this.page.waitForLoadState("load");
    await this.searchBar.fill(productName);
    await this.searchBar.press("Enter");
    await this.page.waitForLoadState("load");
    const productCardCount =await this.productNamecards.count();
    let productFound = false;
    for (let i = 0; i < productCardCount; i++) {
      const cardText = await this.productNamecards.nth(i).textContent();
      if (cardText.includes(productName)) {
        productFound = true;
        console.log(`Product found: ${cardText}`);
        break;
      }
    }
    expect(productFound).toBeTruthy();
    await this.firstProduct.waitFor({ state: "visible" });
    await this.firstProduct.click();
    await this.page.waitForLoadState("load");
  }

  async searchProduct(productName : string) {
    await this.page.waitForLoadState("load");
    await this.searchBar.fill(productName);
    await this.searchBar.press("Enter");
    await this.page.waitForLoadState("load");
    await this.sortByButton.selectOption({ label: "Price (Low > High)" });
    await this.page.waitForLoadState("load");
  }

  async sortProductFromLowToHigh(){
    await this.page.waitForLoadState('networkidle');
    await expect(this.productPriceCards.first()).toBeVisible({ timeout: 10000 });
    await expect(this.productNamecards.first()).toBeVisible({ timeout: 10000 });

    // Get the prices and product names
    const prices = await this.productPriceCards.allInnerTexts();
    const names = await this.productNamecards.allInnerTexts();

    // Parse the prices and find the lowest one
    const priceValues = prices.map((price) =>
      parseFloat(price.replace(/[^0-9.]/g, ""))
    );

    const minPrice = Math.min(...priceValues);
    const minPriceIndex = priceValues.indexOf(minPrice);
    const minPriceProductName = names[minPriceIndex];

    console.log(`Lowest Priced Product: ${minPriceProductName} - $${minPrice}`);

    // Write to CSV
    const csvContent = `Product Name,Price\n${minPriceProductName},$${minPrice}\n`;
    fs.writeFileSync("lowest_priced_product.csv", csvContent, "utf-8");
    console.log("Product details written to lowest_priced_product.csv");
  

  }


  }
