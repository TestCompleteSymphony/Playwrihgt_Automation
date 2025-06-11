import {  expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import getPages from '../utils/pageFactory.js';
import {test} from '../../../helpers/fixtures.js'
import { getDbPool } from '../utils/dbUtils.js';

class CreditReview{

    constructior(page){
        this.page=page;
        this.pageUtils=this.getPages(page)
        this.addCreditReviewBtn=this.page.getByRole(button,{name:'Add Credit Review'})

       
    }
    async checkCreditReviewRecordExixtance(cpName,status){
        

    }



}export default CreditReview