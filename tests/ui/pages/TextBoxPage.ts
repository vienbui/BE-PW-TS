import { Page, Locator } from '@playwright/test';
import { MainPage } from './mainPage';

export class TextBoxPage extends MainPage {
  // Locators
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputBox: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.emailInput = page.getByPlaceholder('name@example.com');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.outputBox = page.locator('#output');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('p#currentAddress');
  }

  // Actions
  async goto() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async fillTextBox(name: string, email: string, currentAddr: string, permanentAddr: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddr);
    await this.permanentAddressInput.fill(permanentAddr);
  }

  async submit() {
    await this.submitButton.click();
  }
}