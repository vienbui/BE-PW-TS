import { test, expect } from '@playwright/test';
import { API_URLS } from '../testData/apiData';

test.describe('Brand API',  () => {

    // API3: get all brands list with valid response 200 and brands list is not empty
    test('Get all brands list', async ({request}) => {
        const response = await request.get(API_URLS.brandList);
        expect (response.status()).toBe(200)
        const responseBody = await response.json();
        expect (responseBody.brands).toBeDefined();
        expect (responseBody.brands.length).toBeGreaterThan(0);
        expect (responseBody.brands[0].brand).toBeDefined();
        expect (responseBody.brands[0].id).toBeDefined();
    })
})