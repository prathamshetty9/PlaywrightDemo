import test from "../../pages/lamda-test/lamdaBasePage";
import products from "../../test-data/lamda-test/product.json";
import user from "../../test-data/lamda-test/user.json";
import { expect } from "@playwright/test";


test.beforeEach(
  async ({ page, baseURL, loginPage, cartPage}) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/", {
      waitUntil: "domcontentloaded",
    });
  // await page
  // .context()
  // .addCookies([{ name: "x.test", value: "true", url: `${baseURL}` }]);
  await loginPage.loginThroughEmailAndPassword(
    user.userCredentials.emailId,
    user.userCredentials.password
  );
  await cartPage.emptyCart();
});


test("To verify Simple Order Journey. @LAMDA", async ({
  homePage,
  productDescriptionPage,
  cartPage,
  checkoutPage,
  confirmOrderPage
}) => {
  await homePage.searchingForProduct(products.name.productName1);
  await productDescriptionPage.addToBag(products.quantity.multipleQuantity);
  await productDescriptionPage.goToCart();
  var totalPrice=await cartPage.proceedToCheckout();
  await checkoutPage.validateTotalPrice(totalPrice);
  await checkoutPage.proceedToPayment(products.accountDetails.firstName,products.accountDetails.lastName,products.address.addressLine,products.address.locality);
  await confirmOrderPage.clickOnConfirmOrder();      
});


test.only("To verify Sort option In PLP. @LAMDA", async ({
  homePage,
}) => {
  await homePage.searchProduct(products.name.productName2);
  await homePage.sortProductFromLowToHigh();
});
