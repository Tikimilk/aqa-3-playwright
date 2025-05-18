// // Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// // https://anatoly-karpovich.github.io/demo-login-form/

// // Требования:
// // Страница регистрации:
// //   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// //   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// // Страница логина:
// //   Username: обязательное
// //   Password: обязательное
// import { test, expect } from "@playwright/test";

// const testData = [
//     {
//         username: "us",
//         password: "Passwor",
//         errorDescription: "Please, provide valid data",
//     },
//     {
//         username: "user123456789012345678901234567890123454041",
//         password: "Passworda",
//         errorDescription: "Successfully registered! Please, click Back to return on login page",
//     },
//     {
//         username: "user123",
//         password: "Passwor",
//         errorDescription: "Password should contain at least 8 characters",
//     },
//     {
//         username: "user123",
//         password: "password",
//         errorDescription: "Successfully registered! Please, click Back to return on login page",
//     },
//     {
//         username: "user123",
//         password: "PASSWORD",
//         errorDescription: "Password should contain at least one character in lower case",
//     },
//     {
//         username: " ",
//         password: "passworD1",
//         errorDescription: "Prefix and postfix spaces are not allowed is username",
//     },
//     {
//         username: "user123",
//         password: "",
//         errorDescription: "Password is required",
//     },
//     {
//         username: "",
//         password: " ",
//         errorDescription: "Please, provide valid data",
//     },
// ];

// test.describe("[UI] [Demo] Negative tests", () => {
//     for(const data of testData) {
//       test(`должно отображаться сообщение об ошибке, если имя пользователя="${data.username}" и пароль="${data.password}"`, async({page}) => {
  
//           await page.goto("https://anatoly-karpovich.github.io/demo-login-form/")
  
//           await page.locator("#registerOnLogin").click();
  
//           await page.locator("#userNameOnRegister").fill(data.username);
  
//           await page.locator("#passwordOnRegister").fill(data.password);
  
//           await page.getByRole('button', { name: 'register' }).click();
  
//           const errorLocator = page.locator('#errorMessageOnRegister');
//           await expect(errorLocator).toHaveText(data.errorDescription);
//       })
//     }
//   });