// Разработать тест со следующими шагами:
// https://anatoly-karpovich.github.io/demo-shopping-cart/
//   - добавить продукты 2,4,6,8,10
//   - завалидировать бейдж с количеством
//   - открыть чекаут
//   - завалидировать сумму и продукты
//   - ввести все найденные вами промокоды (вспоминаем первую лекцию)
//   - завалидировать конечную сумму
//   - зачекаутиться
//   - завалидировать сумму


  import { test, expect, Page } from '@playwright/test';

  enum Promocodes {
    DISCOUNT20 = "HelloThere",
    DISCOUNT15 = "15-PERCENT-FOR-CSS",
    DISCOUNT10 = "HOT-COURSE",
    DISCOUNT10_BASIC = "10-PERCENT-FOR-REDEEM",
    DISCOUNT8 = "NO-PYTHON",
    DISCOUNT7 = "JAVA-FOR-BOOMERS",
    DISCOUNT5 = "5-PERCENT-FOR-UTILS",
  }
  
  const products = [
    'Product 2',
    'Product 4',
    'Product 6',
    'Product 8',
    'Product 10',
  ];
  
  test.describe('[UI] Shopping Cart', () => {
    test('Checkout with 5 products and promo codes', async ({ page }) => {
      // Шаг 1: Перейти на страницу
      await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');
  
      // Шаг 2: Добавить продукты 2, 4, 6, 8, 10
      for (const product of products) {
        await page
          .locator('div.card-body')
          .filter({ hasText: product })
          .getByRole('button', { name: 'Add to card' })
          .click();
        await page.waitForSelector('#badge-number');
      }
  
      // Шаг 3: Проверить бейдж (должно быть 5 товаров)
      await expect(page.locator('#badge-number')).toHaveText('5');
  
      // Шаг 4: Перейти в корзину
      await page.getByRole('button', { name: 'Shopping Cart' }).click();
  
      // Шаг 5: Проверить товары в корзине
      await expect(page.locator('h5')).toContainText(products);
  
      // Шаг 6: Применить промокоды
      const promoCodes = Object.values(Promocodes);
      for (const promo of promoCodes) {
        await page.fill('#rebate-input', promo);
        await page.getByRole('button', { name: 'Redeem' }).click();
        await page.waitForSelector('#rebates-list small');
      }
  
      // Шаг 7: Проверить итоговую сумму после скидок
      const totalPriceText = await page.locator('#total-price').textContent();
      if (!totalPriceText) {
        throw new Error('Total price text is undefined or null');
      }
      const totalPrice = parseFloat(totalPriceText.replace('$', ''));
      if (isNaN(totalPrice)) {
        throw new Error('Failed to parse total price');
      }
  
      // Шаг 8: Завершить покупку
      await page.locator('#continue-to-checkout-button').click();
  
      // Шаг 9: Проверить итоговую сумму на странице подтверждения
      await expect(page.locator('span.text-muted')).toHaveText(`$${totalPrice.toFixed(2)}`);
    });
  });