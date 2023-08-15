import {test, expect} from '@playwright/test';

const baseURL = 'https://randomuser.me'


test.describe ('API testing', () => {
    // Each Test asserts its particular endpoint returns a 200
    // This check could be replaced in a beforeEach() function if need be

    test("Assert Response Status", async ({ request}) => {
        const response = await request.get(`${baseURL}/api`)
        expect(response.status()).toBe(200)
    })

    test("Assert Response Content", async ({ request}) => {
        const response = await request.get(`${baseURL}/api`)
        const responseBody = JSON.parse( await response.text())
        expect(response.status()).toBe(200)

        expect(responseBody.results[0]["gender"]).toBeTruthy();
        expect(responseBody.results[0]["name"]).toBeTruthy();
        expect(responseBody.results[0]["location"]).toBeTruthy();
        expect(responseBody.results[0]["email"]).toBeTruthy();
        expect(responseBody.results[0]["login"]).toBeTruthy();
        expect(responseBody.results[0]["dob"]).toBeTruthy();
        expect(responseBody.results[0]["registered"]).toBeTruthy();
        expect(responseBody.results[0]["phone"]).toBeTruthy();
        expect(responseBody.results[0]["cell"]).toBeTruthy();
        expect(responseBody.results[0]["id"]).toBeTruthy();
        expect(responseBody.results[0]["picture"]).toBeTruthy();
        expect(responseBody.results[0]["nat"]).toBeTruthy();
    })

    test("Assert New User Has Assigned Gender", async ({ request}) => {
        const response = await request.get(`${baseURL}/api/?gender=female`)
        const responseBody = JSON.parse( await response.text())
        expect(response.status()).toBe(200)

        expect(responseBody.results[0]["gender"]).toBe("female");
    })

    test("Assert New User Has Assigned Nationality", async ({ request}) => {
        const response = await request.get(`${baseURL}/api/?nat=mx`)
        const responseBody = JSON.parse( await response.text())
        expect(response.status()).toBe(200)
        
        expect(responseBody.results[0]["nat"]).toBe("MX");
    })

    test("Assert Two Users Are Created With Two Unique Emails", async ({ request}) => {
        const response = await request.get(`${baseURL}/api/?results=2`)
        const responseBody = JSON.parse( await response.text())
        expect(response.status()).toBe(200)

        const userOneEmail = responseBody.results[0]["email"];
        const userTwoEmail = responseBody.results[1]["email"];
    
        expect(userOneEmail).not.toEqual(userTwoEmail);
  
    })

})