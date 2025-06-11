import { expect } from '@playwright/test';
export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Кнопки и поля на разных шагах оформления
    this.addToCartBackpackBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.errorMessage = page.locator('[data-test="error"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async addBackpackToCart() {
    await this.addToCartBackpackBtn.click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName, lastName, postalCode = '') {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    if (postalCode) {
      await this.postalCodeInput.fill(postalCode);
    }
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toContainText('Thank you for your order!');
  }
}