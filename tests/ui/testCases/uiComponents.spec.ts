import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { userData } from '../testData/userData';

test.describe('Text Box', () => {

    let textBoxPage: TextBoxPage;

    test.beforeEach(async ({ page }) => {
        textBoxPage = new TextBoxPage(page);
        await textBoxPage.goto();
    })

    test('Fill out the form', async () => {
       const user = userData.validUser;
       await textBoxPage.fillForm(
        user.name,
        user.email,
        user.currentAddress,
        user.permanentAddress
    );
    await textBoxPage.submit();

    // Assertions
    await expect(textBoxPage.outputBox).toBeVisible();
    await expect(textBoxPage.outputName).toContainText(user.name);
    await expect(textBoxPage.outputEmail).toContainText(user.email);
    await expect(textBoxPage.outputCurrentAddress).toContainText(user.currentAddress);
    })
})