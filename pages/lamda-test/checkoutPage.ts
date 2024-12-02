import { expect, Locator, Page } from "@playwright/test";

export default class checkoutPage {
  page: Page;
  readonly agreeBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postcodeInput: Locator;
  readonly totalPriceText: Locator;
  readonly continueButton: Locator;
  readonly customAddressToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agreeBtn = page.locator("//input[contains(@id,'input-agree')]");
    this.firstNameInput = page.locator("//input[contains(@id,'input-payment-firstname')]");
    this.lastNameInput =page.locator("//input[contains(@id,'input-payment-lastname')]");
    this.addressInput =page.locator("//input[contains(@id,'input-payment-address-1')]");
    this.cityInput =page.locator("//input[contains(@id,'input-payment-city')]");
    this.postcodeInput =page.locator("//input[contains(@id,'input-payment-postcode')]");
    this.continueButton =page.locator("//button[contains(@id,'button-save')]");
    this.totalPriceText =page.locator("//div[contains(@id,'checkout-cart')]//tbody//td");
    this.customAddressToggle =page.locator("//input[contains(@id,'input-payment-address-new')]");
    }


  async enterDeliverToAddress(firstName: string, lastName : string, address : string, city : string){
    await this.customAddressToggle.click({ force: true });
    expect(await this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(firstName);
    expect(await this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(lastName);
    expect(await this.addressInput).toBeVisible();
    await this.addressInput.fill(address);
    expect(await this.cityInput).toBeVisible();
    await this.cityInput.fill(city);
  }

  async clickOnContinueButton(){
    await this.page.waitForLoadState("load");
    await this.continueButton.click();
  }

  async validateTotalPrice(totalPrice: string) {
    await this.page.waitForLoadState("load");
    const totalPriceInCheckOut = await this.totalPriceText.last().textContent();
  
    const totalPriceNumber = parseFloat(totalPrice.replace(/[^0-9.]/g, ''));
    const totalPriceInCheckOutNumber = parseFloat(totalPriceInCheckOut.replace(/[^0-9.]/g, ''));
  
    // Check if the total price is close within a reasonable precision
    expect(totalPriceInCheckOutNumber).toBeCloseTo(totalPriceNumber, 2);
  }  

  async proceedToPayment(firstName: string, lastName : string, address : string, city : string){
    await this.page.waitForLoadState("load");
    this.enterDeliverToAddress(firstName,lastName,address,city);
    expect(await this.agreeBtn).toBeVisible();
    await this.agreeBtn.scrollIntoViewIfNeeded();
    await this.agreeBtn.click({ force: true });
    await this.continueButton.click({ force: true });
    await this.continueButton.click();
  }


  }
