const { expect } = require('@playwright/test')

const fillEmail = async (page, email) => {
  await page.locator('[id="username"]').fill(email);
};

const fillPassword = async (page, password) => {
  await page.locator('[id="password"]').fill(password);
};

const clickLoginButton = async (page) => {
  await page.locator('[name="login"]').click();
};

const verifySuccessfulLogin = async (page) => {
  const navBarDiv = page.getByTestId('navigation-appbar');
  await expect(navBarDiv).toBeVisible();
};

export const login = async (page, email, password) => {
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
  const ci = process.env.CI ?? false;

  if (ci) {
    await page.goto(baseUrl);
    await page.getByTestId('sign-in-button').click();
    await fillEmail(page, email);
    await fillPassword(page, password);
    await clickLoginButton(page);
    await verifySuccessfulLogin(page);
  } else {
    await page.goto(baseUrl);
    await page.getByTestId('sign-in-button').click();
    await verifySuccessfulLogin(page);
  }
};
