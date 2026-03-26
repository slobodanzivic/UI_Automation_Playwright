import { Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {

    private readonly page: Page;

    //Locators
    private readonly emailInput: Locator
    private readonly continueButton: Locator;
    private readonly successMessage: Locator;
    private readonly errorMessage: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.successMessage = page.locator('.alert.alert-success.alert-dismissible');
        this.errorMessage = page.locator('.alert.alert-danger.alert-dismissible');
    }

    //Enter email address
    async enterEmailAddress(email: string) {
        await this.emailInput.fill(email);
    }

    //Click on Continue button
    async clickOnContinueButton() {

        await this.continueButton.click();
    }

    //Get success message text
    async getSuccessMessageText(): Promise<string> {
        return await this.successMessage.textContent() || "";
    }

    //Get error message text
    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage.textContent() || "";
    }

}