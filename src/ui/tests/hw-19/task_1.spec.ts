// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import { test, expect } from '@playwright/test';
const URL = 'https://the-internet.herokuapp.com/';
const DYNAMIC_CONTROLS_PATH = 'Dynamic Controls';
const selectors = {
  dynamicControlsLink: { role: 'link', name: DYNAMIC_CONTROLS_PATH },
  pageHeading: { role: 'heading', name: DYNAMIC_CONTROLS_PATH },
  removeButton: { role: 'button', name: 'Remove' },
  addButton: { role: 'button', name: 'Add' },
  checkbox: { role: 'checkbox' },
  goneMessage: { text: "It's gone!" },
  backMessage: { text: "It's back!" }
};

test.describe("[UI] Dynamic Controls", () => {
  test('Проверка функциональности кнопок Remove и Add', async ({ page }) => {
    // Шаг 1: Открытие главной страницы
    await page.goto(URL);

    // Шаг 2: Переход на страницу Dynamic Controls
    await page.getByRole(selectors.dynamicControlsLink.role, { 
      name: selectors.dynamicControlsLink.name 
    }).click();

    // Шаг 3: Ожидание появления кнопки Remove
    await expect(page.getByRole(selectors.removeButton.role, { 
      name: selectors.removeButton.name 
    })).toBeVisible();

    // Шаг 4: Валидация заголовка страницы
    await expect(page.getByRole(selectors.pageHeading.role, { 
      name: selectors.pageHeading.name 
    })).toBeVisible();

    // Шаг 5: Активация чекбокса
    await page.getByRole(selectors.checkbox.role).check();

    // Шаг 6: Клик по кнопке Remove
    await page.getByRole(selectors.removeButton.role, { 
      name: selectors.removeButton.name 
    }).click();

    // Шаг 7: Ожидание исчезновения чекбокса
    await expect(page.getByRole(selectors.checkbox.role)).toBeHidden();

    // Шаг 8: Проверка наличия кнопки Add
    await expect(page.getByRole(selectors.addButton.role, { 
      name: selectors.addButton.name 
    })).toBeVisible();

    // Шаг 9: Валидация текста "It's gone!"
    await expect(page.getByText(selectors.goneMessage.text)).toBeVisible();

    // Шаг 10: Клик по кнопке Add
    await page.getByRole(selectors.addButton.role, { 
      name: selectors.addButton.name 
    }).click();

    // Шаг 11: Ожидание появления чекбокса
    await expect(page.getByRole(selectors.checkbox.role)).toBeVisible();

    // Шаг 12: Валидация текста "It's back!"
    await expect(page.getByText(selectors.backMessage.text)).toBeVisible();
  });
});