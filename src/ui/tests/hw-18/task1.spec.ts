// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

import test, { expect } from "@playwright/test";
test.describe("[UI] [demo] Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test("Register with valid user", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("Password1");
    await page.locator("#register").click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toContainText("Successfully registered");
  });

  test("registration with empty data", async ({ page }) => {
   
    await page.locator("#register").click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toContainText("valid data");
  });

  test("Username less than 3 characters", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill("ab");
    await page.locator("#passwordOnRegister").fill("Password1");
    await page.locator("#register").click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toContainText("should contain");
  });
  test ("Username more than 40 characters", async ({ page }) => { 
    await page.locator("#userNameOnRegister").fill('a'.repeat(40));
    await page.locator("#passwordOnRegister").fill("Password123");
    await page.locator("#register").click();
    await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered', { timeout: 5000 });
  });
  test("Password less than 3 characters", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("Passw0r");
    await page.locator("#register").click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toContainText("should contain");
  });

  test("Password more than 20 characters", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("Password123456789123456789");
    await page.locator("#register").click();
    await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered', { timeout: 5000 });
  });

  
});