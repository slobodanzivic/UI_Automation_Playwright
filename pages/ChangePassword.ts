import { Page, Locator } from '@playwright/test';

export class ChangePassword {

    private readonly page: Page;
    private readonly inputPassword: Locator;
    private readonly validationErrorMessage: Locator;
    private readonly inputConfirmPassword: Locator;
    private readonly confirmationValidationMesage: Locator;
    private readonly continueButton: Locator;
    private readonly backButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputPassword = page.locator('#input-password');
        this.validationErrorMessage = page.locator('//div[contains(@class,"text-danger")]');
        this.inputConfirmPassword = page.locator('#input-confirm');
        this.confirmationValidationMesage = page.locator('.text-danger');
        this.continueButton = page.locator('input[value="Continue"]');
        this.backButton = page.locator('a[class="btn btn-default"]');
    }

    //Click and enter new password
    async enterNewPassword(newPassword: string): Promise<void> {
        await this.inputPassword.click();
        //clear the input field before entering new password
        await this.inputPassword.fill('');
        await this.inputPassword.fill(newPassword);
    }

    //Get password validation error message
    async getPasswordValidationErrorMessage(): Promise<string> {
        return await this.validationErrorMessage.textContent() || "";
    }

    //Click and enter confirm password
    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.inputConfirmPassword.click();
        await this.inputConfirmPassword.fill(confirmPassword);
    }

    //Get confirm password validation error message
    async getConfirmPasswordValidationErrorMessage(): Promise<string> {
        return await this.confirmationValidationMesage.textContent() || "";
    }

    //Click on Continue button
    async clickOnContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    //Click on Back button
    async clickOnBackButton(): Promise<void> {
        await this.backButton.click();
    }

}