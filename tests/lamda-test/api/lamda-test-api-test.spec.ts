import { test, expect, request } from '@playwright/test';

test('API validation for adding product to cart @LAMDA', async () => {
  // Create a new request context
  const requestContext = await request.newContext();

  // Send POST request
  const response = await requestContext.post(
    'https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart/add', {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: 'quantity=1&product_id=36', // Payload
    }
  );

  // Assert the response status code
  expect(response.status()).toBe(200); 

  // Parse and validate the response body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);


  // Close the request context
  await requestContext.dispose();
});
