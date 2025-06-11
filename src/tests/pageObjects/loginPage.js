

class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = this.page.getByTestId('sign-in-button');
  }

  async goto() {
    await this.page.goto('');
  }
}

export default { LoginPage };