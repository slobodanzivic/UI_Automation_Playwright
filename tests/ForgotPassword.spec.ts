import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ForgotPasswordPage } from '../pages/ForgotPassword';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { saveCredentials } from '../utils/testDataStore';
import { loadCredentials } from '../utils/testDataStore';

test.describe('Forgot Password Tests', () => {

    let homePage: HomePage;
    let forgotPasswordPage: ForgotPasswordPage;
    let loginPage: LoginPage;
    let testConfig: TestConfig;

    test.beforeEach(async ({ page }) => {

        //Create page objects
        homePage = new HomePage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);
        loginPage = new LoginPage(page);
        testConfig = new TestConfig();
        
        await page.goto(testConfig.appUrl);
    });

   

    test('Verify Forgot Password with valid registered email @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        //Navigate to Login Page
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Click on Forgotten Password link
        await loginPage.clickOnForgottenPasswordLink();

        //Enter registered email address
        await forgotPasswordPage.enterEmailAddress(credentials.randomEmail);

        //Click on Continue button
        await forgotPasswordPage.clickOnContinueButton();

        //Verify success message
        const successMessageText = await forgotPasswordPage.getSuccessMessageText();
        expect(successMessageText).toContain("An email with a confirmation link has been sent your email address.");

    });

    test('Verify Forgot Password with unregistered email @master', async ({ page }) => {

        //Navigate to Login Page
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Click on Forgotten Password link
        await loginPage.clickOnForgottenPasswordLink();

        //Enter unregistered email address
        await forgotPasswordPage.enterEmailAddress(testConfig.unregisteredEmail);

        //Click on Continue button
        await forgotPasswordPage.clickOnContinueButton();

        //Verify error message
        const errorMessageText = await forgotPasswordPage.getErrorMessageText();
        expect(errorMessageText).toContain("Warning: The E-Mail Address was not found in our records, please try again!");
    });
});