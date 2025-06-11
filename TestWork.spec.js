import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CheckoutPage } from './pages/CheckoutPage';

test('test 1 Сортировка товаров по возрастанию цены', async ({ page }) => {
  await page.waitForTimeout(15000);
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.getByText('Name (A to Z)Name (A to Z)').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});


test('test 2 Переход к оформлению заказа без авторизации', async ({ page }) => {
  await page.waitForTimeout(15000);
  await page.goto('https://www.saucedemo.com/cart.html');
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access');
});

test('test 3 Попытка оформления заказа без заполненного поля “Zip/Postal Code”', async ({ page }) => {
  await page.waitForTimeout(15000);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await checkoutPage.addBackpackToCart();
  await checkoutPage.goToCart();
  await checkoutPage.startCheckout();

  await checkoutPage.fillCheckoutInfo('Василий', 'Карнаухов');
  await checkoutPage.continueCheckout();

  await checkoutPage.expectErrorVisible();
});

test('test 4 Полное оформление заказа с добавлением товара в корзину и оплатой', async ({ page }) => {
  await page.waitForTimeout(15000);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await checkoutPage.addBackpackToCart();
  await checkoutPage.goToCart();
  await checkoutPage.startCheckout();

  await checkoutPage.fillCheckoutInfo('Василий', 'Карнаухов', 'asdas1227@mail.ru');
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await checkoutPage.expectOrderComplete();
});

test('test 5 Оформление заказа с пустой корзиной товаров', async ({ page }) => {
  await page.waitForTimeout(15000);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await checkoutPage.goToCart();
  await checkoutPage.startCheckout();

  await checkoutPage.fillCheckoutInfo('Василий', 'Карнаухов', 'asdas1227@mail.ru');
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await checkoutPage.expectOrderComplete();
});