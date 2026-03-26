import { Page, Locator } from '@playwright/test';

export class NewsletterSubscriptionPage {
    private readonly page: Page;

    // Locators
    private readonly yesRadioButton: Locator
    private readonly noRadioButton: Locator;
    private readonly continueButton: Locator;
    private readonly backButton: Locator;
    private readonly successMessage: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.yesRadioButton = page.locator('input[value="1"]');
        this.noRadioButton = page.locator('input[value="0"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.backButton = page.locator('a[class="btn btn-default"]');
        this.successMessage = page.locator('.alert.alert-success.alert-dismissible');
    }

    //Select Yes for Newsletter Subscription
    async selectYesForNewsletterSubscription(): Promise<void> {
        await this.yesRadioButton.check();
    }

    //Select No for Newsletter Subscription
    async selectNoForNewsletterSubscription(): Promise<void> {
        await this.noRadioButton.check();
    }

    //Click on Continue button
    async clickOnContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    //Click on Back button
    async clickOnBackButton(): Promise<void> {
        await this.backButton.click();
    }

    //Get Success Message text
    async getSuccessMessageText(): Promise<string> {
        return await this.successMessage.textContent() || "";
    }

}