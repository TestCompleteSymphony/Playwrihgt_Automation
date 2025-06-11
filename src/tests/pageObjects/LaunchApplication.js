import {login} from '../../../helpers/login';
import {test}  from '../../../helpers/fixtures';
import {expect} from  '@playwright/test'
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const authFile = 'tests/playwright/.auth/user.json';

class LaunchApp {
    constructor(page) {

        this.page = page

    }

    async openApplication() {

        await login(this.page, process.env.MSO_EMAIL, process.env.MSO_PASSWORD);
        await this.page.context().storageState({ path: authFile });
    }
    async verifyIspageDisplayed() {

        const dashboard = this.page.getByRole('link', { name: 'Dashboard' })

        await expect(dashboard).toBeVisible();

    }

} export { LaunchApp };



