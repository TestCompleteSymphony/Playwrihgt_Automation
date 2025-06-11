import { createBdd } from 'playwright-bdd'

import {LaunchApp} from '../pageObjects/LaunchApplication'

import { BusinessUtils } from '../pageObjects/businessUtils'
const { Given, Then, When } = createBdd ()
let launchApp, businessUtils
import { test } from '@playwright/test'

Given('User Launched Cassandra Application', async ({ page }) => {
    launchApp = new LaunchApp(page)
    businessUtils = new BusinessUtils(page)
    await launchApp.openApplication()
})
When('User verifies Application launched Successfully', async ({ page }) => {

    await launchApp.verifyIspageDisplayed()
})

Then('User Opens {string} Tab', async ({ page }, tabName) => {
    await businessUtils.openMainMenu(tabName)
});

Then('User should be able to see the {string} details', async ({ page }, pageSummary) => {
    await businessUtils.verifyIspageDisplayed(pageSummary)
});

Then('User should be able to see the {string}  of {string} and verified the page response', async ({ page }, submenuName, mainMenu) => {
    //await businessUtils.openSubMenuandVerify(submenuName, mainMenu)
    await businessUtils.VerifySubMenuPages(submenuName, mainMenu)
});

When('User searched for {string} CounterParty {string} and opened',async({page},parentObj,cpName)=>{
    await businessUtils.openCounterPartyfromGlobalSearch(parentObj, cpName)
})
When('User Opened {string} Tab and Verified {string} page is Opened Successfully',async ({ page },TabName,pageName ) => {
    
    await businessUtils.openCPPageTabs(TabName,pageName)
})