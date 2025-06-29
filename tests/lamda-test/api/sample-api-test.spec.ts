import { test, expect, request } from '@playwright/test';
const User = require('../../../pages/api/pojo/User.js');
const userApi = require('../../../pages/api/base/basePOSTApi.js'); 

test('Sample GET API validation @LAMDA', async () => {
  // Create a new request context
  const requestContext = await request.newContext();

  // Send POST request
  const response = await requestContext.get(
    'https://reqres.in/api/users?page=2', {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
  );

  // Assert the response status code
  expect(response.status()).toBe(200); 

  // Parse and validate the response body
  const responseBody = await response.json();
//   console.log('Response Body:', responseBody);

   // Extract ID of the person with last name 'Edwards'
//    const edwardsUser = responseBody.data.find(user => user.last_name === 'Edwards');

//    if (edwardsUser) {
//      console.log('ID of Edwards:', edwardsUser.id);
//    } else {
//      console.log('User with last name Edwards not found.');
//    }

responseBody.data.forEach(user => {
    console.log(`Checking user: ${user.first_name} ${user.last_name}, ID: ${user.id}`);

    expect(user.id).toBeDefined();
    expect(user.id).not.toBeNull();
    expect(user.id).not.toBeUndefined();
    // expect(typeof user.id).toBe('number'); // Ensure ID is a number
    // expect(user.id).toBeGreaterThan(0); // Ensure it's a valid positive number
  });

  // Close the request context
  await requestContext.dispose();
});

test('Sample POST API validation @LAMDA', async () => {
    // Create a new request context
    const requestContext = await request.newContext();

    const user = new User()
    .setId(9)
    .setEmail("tobi.funny@reqres.in")
    .setFirstName("Toby")
    .setLastName("Funny")
    .setAvatar("https://reqres.in/img/faces/9-image.jpg");

    const id= 12;
  
    // Send POST request
    // Call the API method to create a user
  const responseBody = await userApi.createUser(user);
      
  console.log(responseBody.createdAt);
    expect(responseBody.createdAt).toBeDefined();
    expect(responseBody.createdAt).not.toBeNull();


    const responseGet = await requestContext.get(
        `https://reqres.in/api/users/${id}`, {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
    );
    
    // Assert the response status code
    expect(responseGet.status()).toBe(200); 
    
    // Parse and validate the response body
    const responseBodyGet = await responseGet.json();

    expect(responseBodyGet.data.id).toBe(id);

    // Close the request context
    await requestContext.dispose();
  });