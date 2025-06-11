import {  expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import getPages from '../utils/pageFactory.js';
import {test} from '../../../helpers/fixtures.js'
import { getDbPool } from '../utils/dbUtils.js';



const logger = {
    info: (msg) => console.log(`ℹ[INFO] ${new Date().toISOString()} - ${msg}`),
    error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  };

  const logs=[]

class BusinessUtils {

    constructor(page) {
        this.page = page
        this.utils = getPages(page);
        this.globalSearchObj=this.page.locator("input[placeholder='Explore counterparties']")
        this.parentCpobj=this.page.locator("a:has(div.parent)")

    }


    async openSubMenuandVerify(submenuName, mainMenu) {
        if (submenuName != undefined && submenuName != "") {
            await this.openMainMenu(mainMenu)
           await  this.utils.pageUtils.click(this.getByRole('menuitem', { name: submenuName }))
            //await this.getByRole('menuitem', { name: submenuName }).click()
        } else {
            if(mainMenu !=='Exposure')
            await this.openMainMenu(mainMenu)
        }
    }

    async openMainMenu(menuName) {
        await  this.utils.pageUtils.click(this.page.getByRole('link', { name: menuName },{ timeout: 1000 }),`clicking on:`+menuName)
        const db = await getDbPool();
        const result = await db.query(`select *from CreditReview where creditOfficerId='58762195-F7EB-4393-A353-3FE42082FE9B' and status='DRAFT'`);
        console.log(result.recordset);

    }
    async verifyIspageDisplayed(pageSummary) {
        await this.utils.pageUtils.expectVisible(this.page.getByText(pageSummary),`${pageSummary} of DashBoard page opened successfully` )
        

    }

    async VerifySubMenuPages(subMenu, mainMenu) {
        logs.push('smoketet started')
        let alertTriggered=false
       
        if (mainMenu === 'Static Data') {
            this.openMainMenu(mainMenu)
            await expect(this.page.locator("ul[role='menu']").nth(1).locator('li')).toHaveCount(14)
            const staticMenuitemList = this.page.locator("ul[role='menu']").nth(1).locator('li')
            let count = await staticMenuitemList.count()
            logger.info('count of submenus:'+count)
            this.page.on('dialog', async dialog => {
                alertTriggered = true;
                console.info(`Alert detected: ${dialog.message()}`);
                await dialog.dismiss(); 
              });
            for (let i = 0; i < count; i++) {
              
                let subMenuName=await staticMenuitemList.nth(i).textContent()
                await  this.utils.pageUtils.click(staticMenuitemList.nth(i))
                if (alertTriggered) {
                    logs.push(' An error occurred!')
                    
                return
                  } else {
                    
                    logs.push(' No alert appeared.')
                  }
                if(subMenuName=='Trading Counterparty/Group'){
                    await this.utils.pageUtils.expectVisible(this.page.getByText('All Counterparties'),"Trading Counterparty/Group page opened Successfully")
                    await this.utils.pageUtils.expectVisible(this.page.getByRole('table').filter({ hasText: 'Short NameRatingLimitCredit' }))
                }else if(subMenuName=='Portfolios'){
                    this.utils.pageUtils.expectVisible(this.page.locator('.MuiDataGrid-main'))
                }else if(subMenuName=='Mercuria Entity'){

                    await expect(this.page.getByRole('button', { name: 'New Mercuria Entity' },{timeout:10000})).toBeEnabled()
                }
                // else if(subMenuName=='Internal Counterparty'){
                  
                // await expect(getByRole('button', { name: 'New Internal Counterparty' },{timeout:10000})).toBeEnabled()

                // }
           
                else if(subMenuName=='Industry'){
                  
                    this.utils.pageUtils.expectVisible(this.page.getByRole('columnheader', { name: 'Industry', exact: true }))
                 
                }else if(subMenuName=='Trading Product'){
                  
                    await expect(this.page.getByRole('columnheader', { name: 'Trading Product' })).toBeVisible()

                }else if(subMenuName=='PD & Recovery rate'){
                  
                    await expect(this.page.getByRole('columnheader', { name: 'Ratings' })).toBeVisible()
                }else if(subMenuName=='Endur Agreement Mapping'){
                  
                    await expect(this.page.getByRole('columnheader', { name: 'Endur Agreement Reference' })).toBeVisible()
                }else if(subMenuName=='ICTS Collateral TNC Type Mapping'){
                  
                    await expect(this.page.getByRole('button', { name: 'Add New' })).toBeEnabled()
                }else if(subMenuName=='Cash Coll. Excl. Counterparties'){
                  
                    await expect(this.page.getByRole('button', { name: 'Add Counterparty' })).toBeEnabled()
                }
                else if(subMenuName=='Excluded Asset loans'){
                  
                    await expect(this.page.getByRole('columnheader', { name: 'Counterparty' })).toBeVisible()
                }else if(subMenuName=='Sovereign Rating'){
                  
                    await expect(this.page.locator('div:nth-child(6) > div:nth-child(2) > .MuiDataGrid-cellContent')).toBeVisible()
                }
                else if(subMenuName=='Trade Excl. from Insurance'){
                  
                    await expect(this.page. getByText('Rows per page:')).toBeVisible()
                }
               this.openMainMenu(mainMenu)
            }
            logger.info('static data pages validation done ')
           // this.openMainMenu(mainMenu)
            allure.attachment('Test Logs', logs.join('\n'), 'text/plain');
        }else if(mainMenu === 'Reporting'){
            this.openMainMenu(mainMenu)
            await this.page.getByRole('tab', { name: 'Limit Excess Report' }).click()
            await expect(this.page.getByRole('columnheader', { name: 'Short Name' })).toBeVisible()
            await this.page.getByRole('tab', { name: 'Minerva Report' }).click()
            await expect(this.page.locator('#minerva-report').getByText('Minerva Report', { exact: true })).toBeVisible()
            await this.page.getByRole('tab', { name: 'Intermediation Report' }).click()
            //await expect(this.page.getByRole('button',{ namr: 'GENERATE'})).toBeDisabled()
            await this.page.getByRole('tab', { name: 'History Data Reports' }).click()
            await expect(this.page.getByRole('combobox', { name: 'Counterparty' })).toBeEditable()
            await this.page.getByRole('tab', { name: 'Management Report' }).click()
            await expect(this.page.getByText('No rows').first()).toBeVisible()
            await this.page.getByRole('tab', { name: 'Tableau Reports' }).click()
            await expect(this.page.getByRole('link', { name: 'Go To Tableau Reports' })).toBeEnabled()

            logger.info('Reports tab validation done ')
            

        }else if(mainMenu === 'Workflow'){
            this.openMainMenu(mainMenu)
            logger.info('Exposure Page Validation started')

            await this.page.getByRole('menuitem', { name: 'Credit Reviews' }).click()

            await expect(this.page.getByRole('columnheader', { name: 'Credit Review Parent' })).toBeVisible()

            await this.page.waitForTimeout(2000)

            this.openMainMenu(mainMenu)
           
            await this.page.getByRole('menuitem', { name: 'Trade Approval' }).click()

            await expect(this.page.getByRole('row', { name: 'Status' }).getByRole('checkbox')).toBeVisible()

            this.openMainMenu(mainMenu)
     
            await this.page.getByRole('menuitem', { name: 'Recovery Rate' }).click()

            await expect(this.page.getByRole('columnheader', { name: 'Manage' },{ timeout: 1000 })).toBeVisible()
            
            this.openMainMenu(mainMenu)

            await this.page.getByRole('menuitem', { name: 'Trader' },{ timeout: 3000 }).click()
        
            const resetBtn=this.page.getByRole('button', { name: 'Reset' })
            await resetBtn.waitFor({state:'visible'},{ timeout: 3000 })
            await expect(resetBtn).toBeEnabled()
           
        }else if(mainMenu==='Exposure'){

         let url
         await this.page.getByRole('link', { name: 'Exposure' }).first().click()
         await this.page.getByRole('menuitem', { name: 'Exposure Details' }).click()
            await expect(this.page.getByRole('button', { name: 'Excel Export' })).toBeVisible()
            await this.page.getByRole('link', { name: 'Exposure' }).first().click()
           
            await this.page.getByRole('menuitem', { name: 'Overdue Counterparties' }).click()
            await expect(this.page.getByText('Show Payable')).toBeVisible()

            await this.page.getByRole('link', { name: 'Exposure' }).first().click()

            await this.page.getByRole('menuitem', { name: 'Weekly exposure report' }).click()

             url=this.page.url()
            expect(url).toContain('weekly-exposure-report')
            
            await this.page.getByRole('link', { name: 'Exposure' }).first().click()
            await this.page.getByRole('menuitem', { name: 'Expected loss report' }).click()
             url=this.page.url()
            expect(url).toContain('expected-loss-report')

            await this.page.getByRole('link', { name: 'Exposure' }).first().click()
            await this.page.getByRole('menuitem', { name: 'Red Flag Report' }).click()
            url=this.page.url()
            expect(url).toContain('red-flag-report')

            await this.page.getByRole('link', { name: 'Exposure' }).first().click()
            await this.page.getByRole('menuitem', { name: 'Payment performance report' }).click()
            url=this.page.url()
            expect(url).toContain('payment-performance-report')
            await this.page.getByRole('link', { name: 'Exposure' }).first().click()
            await this.page.getByRole('menuitem', { name: 'Credit Dashboard' }).click()
            url=this.page.url()
            expect(url).toContain('credit-report')
            logger.info('Exposure menu pages are validated and loaded successfully')
            

        }else if(mainMenu==='Insurance'){
            this.openMainMenu(mainMenu)
            await expect(this.page.getByRole('tab', { name: 'Portfolio Insurance' })).toBeEnabled()
            console.log('Insurance Page Opened successfully')
            //this.openMainMenu(mainMenu)
            logger.info('Insurane page opened successfully ')
        }else{
            console.log('please provide proper menu name')
        }
    }


    async openCounterPartyfromGlobalSearch(selectoPtion,cpName){
        console.log('Opening a counterparty from Global Search of Csaandra App')
        await this.utils.pageUtils.click(this.globalSearchObj)
        await this.utils.pageUtils.fill(this.globalSearchObj,cpName)
        await this.page.pause()
        if(selectoPtion=='parent'){
            await this.utils.pageUtils.click(this.parentCpobj.first())
        }else{
            await this.utils.pageUtils.click(this.parentCpobj.first())
        }
        
        await this.utils.pageUtils.expectVisible(this.page.getByRole('link', { name: 'OVERVIEW' }),'CounterParty OverView Page Opened Successfully')


    }
     async openCPPageTabs(tabName,pageName){
        console.log('Opening a counterparty Page Tabs')
        tabName=tabName.toUpperCase()
        await this.utils.pageUtils.click(this.page.getByRole('link', { name: tabName,exact: true }))
        let url=this.page.url()
        expect(url).toContain(pageName.toLowerCase())

     }
     async openCPCreditReviewPageTabs(tabName,pageName){
        console.log('Opening a CounterParty Credit Review  Page Tabs')
    
        await this.utils.pageUtils.click(this.page.getByRole('link', { name: tabName,exact: true }))
        if(tabName==='Overview'){
            await this.utils.pageUtils.expectVisible(this.page.getByRole('heading', { name: 'Counterparty Details' }),`${tabName} page of  Credit Review Page opened successfully` )
            
        }
        if(tabName==='Limits and Ratings'){
            await page.getByRole('tab', { name: 'Limits and Ratings' }).click();
            await this.utils.pageUtils.expectVisible(this.page.getByRole('heading', { name: 'Ratings', exact: true }),`${tabName} page of  Credit Review Page opened successfully` )  
        }
        if(tabName==='Company Description'){
            await this.utils.pageUtils.click(this.page.getByRole('tab', { name: 'Company Description' }))
            await this.utils.pageUtils.expectVisible(this.page.getByRole('button', { name: 'summary' }),`${tabName} page of Credit Review Page opened successfully`)
        }
        if(tabName==='Company Description'){
            await this.utils.pageUtils.click(this.page.getByRole('tab', { name: 'Company Description' }))
            await this.utils.pageUtils.expectVisible(this.page.getByRole('button', { name: 'summary' }),`${tabName} page of Credit Review Page opened successfully`)
        }

        await page.getByRole('tab', { name: 'Financials' }).click();
        await page.getByRole('tab', { name: 'Financials' }).click();
      
    }

} export { BusinessUtils }