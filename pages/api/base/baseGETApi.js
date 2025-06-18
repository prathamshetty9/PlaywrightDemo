import { request } from "@playwright/test";

class UserGETApi{

    constructor(){
        this.baseUrl = "https://reqres.in/api";
    }

    async getUserList(){
        const requestContext = await request.newContext();

        const responseGet = await requestContext.get(
            `${this.baseUrl}/users`, {
              headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
            }
        );
        
        // Assert the response status code
        expect(responseGet.status()).toBe(200);

        const responseBody = await responseGet.json();

        // Close request context
        await requestContext.dispose();

        return responseBody;
    }


}

module.exports = new UserGETApi();