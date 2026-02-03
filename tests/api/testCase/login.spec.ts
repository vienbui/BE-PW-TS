import {test, expect} from '@playwright/test';
import { API_URLS } from '../testData/apiData';
import { userData } from '../testData/user';

test.describe('Login API', () => {
    // Run tests serially
    test.describe.configure({ mode: 'serial' });

    // Setup: Create valid user before all tests - API 11
    test.beforeAll(async ({ request }) => {
        const newUser = userData.newUser;
        const response = await request.post(API_URLS.createAccount, {
            form: {
                name: 'Valid Test User',
                email: userData.newUser.email,
                password: userData.newUser.password,
                title: 'Mr',
                birth_date: newUser.birth_date,
                birth_month: newUser.birth_month,
                birth_year: newUser.birth_year,
                firstname: 'Valid',
                lastname: 'User',
                company: newUser.company,
                address1: newUser.address1,
                address2: newUser.address2,
                country: newUser.country,
                zipcode: newUser.zipcode,
                state: newUser.state,
                city: newUser.city,
                mobile_number: newUser.mobile_number
            }
        });
        const responseBody = await response.json();
        console.log('Setup - Create validUser:', responseBody.message);
    });

    // Cleanup: Delete valid user after all tests - API 12
    test.afterAll(async ({ request }) => {
        const response = await request.delete(API_URLS.deleteAccount, {
            form: {
                email: userData.newUser.email,
                password: userData.newUser.password
            }
        });
        const responseBody = await response.json();
        console.log('Cleanup - Delete validUser:', responseBody.message);
    });

    // API7: POST to login with valid credentials and get response code 200
    test('POST To Verify Login with valid credentials', async ({request}) => {
        const response = await request.post(API_URLS.verifyLogin, {
            form: {
                email: userData.newUser.email,
                password: userData.newUser.password
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe("User exists!");
    })

    // API8: POST To Verify Login without email parameter
    test('POST To Verify Login without email parameter', async ({request}) => {
        const response = await request.post(API_URLS.verifyLogin, {
            form: {
                password: userData.newUser.password
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain("Bad request, email or password parameter is missing in POST request.");
    })

    // API9: DELETE to verify login - method not supported
    test('DELETE To Verify Login', async ({request}) => {
        const response = await request.delete(API_URLS.verifyLogin);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe("This request method is not supported.");
    })

    // API10: POST To Verify Login with invalid email and password
    test('POST To Verify Login with invalid email and password', async ({request}) => {
        const response = await request.post(API_URLS.verifyLogin, {
            form: {
                email: 'invalid@example.com',
                password: '123456'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe("User not found!");
    })

    // API13: PUT METHOD To Update User Account
    test('PUT To Update User Account', async ({request}) => {
        const newUser = userData.newUser;
        const response = await request.put(API_URLS.updateAccount, {
            form: {
                name: 'Updated User',
                email: userData.newUser.email,
                password: userData.newUser.password,
                title: 'Mrs',
                birth_date: newUser.birth_date,
                birth_month: newUser.birth_month,
                birth_year: newUser.birth_year,
                firstname: 'Updated',
                lastname: 'Name',
                company: 'Updated Company',
                address1: newUser.address1,
                address2: newUser.address2,
                country: newUser.country,
                zipcode: newUser.zipcode,
                state: newUser.state,
                city: newUser.city,
                mobile_number: newUser.mobile_number
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Update response:', responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe("User updated!");
    })

    //API14: GET METHOD To Get User Detail By Email
    test('GET To Get User Detail By Email', async ({request}) => {
        const response = await request.get(API_URLS.getUserDetailByEmail, {
            params: {
                email: userData.newUser.email,
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Get response:', responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.user).toBeDefined();
    })
})
