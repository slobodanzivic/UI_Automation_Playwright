import { Page, Locator } from '@playwright/test';

export class RegistrationPage {

    //Page instance
    private readonly page: Page;

    // Form input fields
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;

    // Radio buttons and checkboxes
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly privacyPolicyCheckbox: Locator;

    // Buttons
    private readonly continueButton: Locator;


    // Initialize locators in the constructor
    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('#input-firstname');
        this.lastNameInput = page.locator('#input-lastname');
        this.emailInput = page.locator('#input-email');
        this.telephoneInput = page.locator('#input-telephone');
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');
        this.newsletterYesRadio = page.locator('input[value="1"][name="newsletter"]');
        this.newsletterNoRadio = page.locator('input[value="0"]');
        this.privacyPolicyCheckbox = page.locator('input[value="1"][name="agree"]');
        this.continueButton = page.locator('input[value="Continue"]');
    }

    // Methods to interact with the registration form

    // Click on First Name input box
    async clickOnFirstNameInput() {
        await this.firstNameInput.click();
    }

    // Enter first name
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    //Click and enter last name
    async clickOnLastNameInput() {
        await this.lastNameInput.click();
    }

    // Enter last name
    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    //Click on email input box
    async clickOnEmailInput() {
        await this.emailInput.click();
    }

    // Enter email address
    async enterEmailAddress(email: string) {
        await this.emailInput.fill(email);
    }

    //Click on telephone input box
    async clickOnTelephoneInput() {
        await this.telephoneInput.click();
    }

    // Enter telephone number
    async enterTelephone(telephone: string) {
        await this.telephoneInput.fill(telephone);
    }

    // Click on password input box
    async clickOnPasswordInput() {
        await this.passwordInput.click();
    }

    // Enter password
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    //Get Text from password input box
    async getPasswordInputText(): Promise<string> {
        return await this.passwordInput.inputValue();
    }

    //Click on confirm password input box
    async clickOnConfirmPasswordInput() {
        await this.confirmPasswordInput.click();
    }

    //  Enter confirm password
    async enterConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordInput.fill(confirmPassword);
    }


    // Select newsletter subscription
    async selectNewsletter(newsletter: boolean) {
        if (newsletter) {
            await this.newsletterYesRadio.check();
        } else {
            await this.newsletterNoRadio.check();
        }
    }

    // Accept privacy policy
    async acceptPrivacyPolicy() {
        await this.privacyPolicyCheckbox.check();
    }

    // Click on Continue button
    async clickContinue() {
        await this.continueButton.click();
    }
}