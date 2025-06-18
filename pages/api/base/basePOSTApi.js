import { test, expect, request } from '@playwright/test';

class UserApi {
  constructor() {
    this.baseUrl = 'https://reqres.in/api'; // Base API URL
  }

  // Method to create a user
  async createUser(user) {
    const requestContext = await request.newContext();

    const response = await requestContext.post(
      `${this.baseUrl}/users`,
      {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: user.toJSON(), // Convert User object to JSON
      }
    );

    const responseBody = await response.json();

    // Close request context
    await requestContext.dispose();

    return responseBody; // Return the response data
  }
}

// Export an instance of the UserApi class
module.exports = new UserApi();
