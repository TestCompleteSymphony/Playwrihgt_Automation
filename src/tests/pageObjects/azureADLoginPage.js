class AzureADLoginPage {
	constructor(page) {
		this.page = page;
		this.accountCard = this.page.getByText(process.env.MSO_EMAIL || '');
	}

	async goto() {
		await this.page.goto('');
	}

	async clickAccountCard() {
		await this.accountCard.click();
	}
}

export default { AzureADLoginPage };