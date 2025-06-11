import { test as base } from '@playwright/test';
import  LoginPage  from "../src/tests/pageObjects/loginPage";
import AzureADLoginPage  from "../src/tests/pageObjects/azureADLoginPage";
import getPages  from '../src/tests/utils/pageFactory';


const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  azureADLoginPage: async ({ page }, use) => {
    const azureADLoginPage = new AzureADLoginPage(page);
    await use(azureADLoginPage);
  },
  pages: async ({ page }, use) => {
    const pages = getPages(page);
    await use(pages);
  }
}); export  {test};
