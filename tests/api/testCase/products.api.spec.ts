import { test, expect } from '@playwright/test';
import { API_URLS } from '../testData/apiData';

test.describe('Products API', () => {
    // API1: Get all products list with valid response 200 and products list is not empty
    test ('Get all products list', async ({request}) => {

        const response = await request.get(API_URLS.productsList);
        expect (response.status()).toBe(200)

        const responseBody = await response.json();
        // console.log(responseBody);
        expect (responseBody.products).toBeDefined();
        expect (responseBody.products.length).toBeGreaterThan(0);
        expect (responseBody.products[0].name).toBeDefined();
        expect (responseBody.products[0].price).toBeDefined();
        expect (responseBody.products[0].brand).toBeDefined();
        expect (responseBody.products[0].category).toBeDefined();
    })

    // API2: Post to all products list and get error 405
    test('Post to all products list and get error 405', async ({request})=> {
        const response = await request.post(API_URLS.productsList);
        expect (response.status()).toBe(200)
        const responseBody = await response.json();

        expect (responseBody.responseCode).toBe(405)
        expect (responseBody.message).toBe('This request method is not supported.')
    })
})

