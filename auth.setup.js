import { test as setup } from '../helpers/fixtures';
import { login } from '../helpers/login';
import { testTags } from '../helpers/enums';

const authFile = 'src/tests/.auth/user.json';

const email = process.env.MSO_EMAIL ?? '';
const password = process.env.MSO_PASSWORD ?? '';

setup('authenticate', async ({ page }) => {
    await login(page, email, password);
    await page.context().storageState({ path: authFile });
})