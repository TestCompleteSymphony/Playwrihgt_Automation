
import {test} from '../helpers/fixtures';
import {expect} from '@playwright/test'
const email = process.env.MSO_EMAIL;
const password = process.env.MSO_PASSWORD;

const submitEmail = async (page, email) => {
	await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(email);
	await page.getByRole('button', { name: 'Next' }).click()
};

const submitPassword = async (page, password) => {
	await page.locator('[id="passwordInput"]').fill(password);
	await page.getByRole('button', { name: 'Sign in' }).click();
};

const finaliseLogin = async (page) => {
	await page.getByRole('button', { name: 'NO' }).click()
};

const verifySuccessfulLogin = async (page) => {
	const dashboard = page.getByRole('link', { name: 'Dashboard' })

	await expect(dashboard).toBeVisible();
};

const generateUrlWithLoginPrompt = async (page) => {
	let currentUrl = page.url();

	await expect
		.poll(
			async () => {
				currentUrl = page.url();
				const parsedUrl = new URL(currentUrl);
				const params = new URLSearchParams(parsedUrl.search);
				return params.get('code_challenge') !== null;
			},
			{
				timeout: 10000
			}
		)
		.toBe(true);

	// Parse the URL again to modify it
	const parsedUrl = new URL(currentUrl);
	const params = new URLSearchParams(parsedUrl.search);

	// Add the prompt=login parameter
	params.set('prompt', 'login');
	parsedUrl.search = params.toString();

	return parsedUrl.toString();
};

export const login = async (page, email, password) => {
	const baseUrl = process.env.BASE_URL ?? 'https://credit-data-service.uat.mercuria.systems/dashboard';
	await page.goto(baseUrl);

	const loginUrl = await generateUrlWithLoginPrompt(page);

	await page.goto(loginUrl);
	await submitEmail(page, email);
	await submitPassword(page, password);
	await finaliseLogin(page);
	await verifySuccessfulLogin(page);
};

