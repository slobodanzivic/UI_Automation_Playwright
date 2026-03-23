import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ChangePassword } from '../pages/ChangePassword';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { loadCredentials } from '../utils/testDataStore';
import { RandomDataProvider } from '../utils/randomDataProvider';


test.describe('Change Password Tests', () => {

    let myAccountPage: MyAccountPage;
    let changePassword: ChangePassword;
    let loginPage: LoginPage;
    let testConfig: TestConfig;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        myAccountPage = new MyAccountPage(page);
        changePassword = new ChangePassword(page);
        loginPage = new LoginPage(page);
        testConfig = new TestConfig();
        homePage = new HomePage(page);
        await page.goto(testConfig.appUrl);

    });

    /*test.afterEach(async ({ page }) => {
        //await page.waitForTimeout(2000);
        await page.close();
    });

    */

    test('Change Password with valid data @master', async ({ page, browserName }) => {

    const credentials = loadCredentials(browserName);
    if (!credentials) throw new Error('No credentials found.');

    const newPassword = RandomDataProvider.getRandomPassword();

    // Login
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.enterEmailAddress(credentials.randomEmail);
    console.log(`Email is used for login: ${credentials.randomEmail}`);

    await loginPage.enterPassword(credentials.randomPassword);
    console.log(`Password is used for login: ${credentials.randomPassword}`);

    await loginPage.clickOnLoginButton();
    
    // Navigate to Change Password page
    await myAccountPage.clickOnChangePasswordLink();

    try {
        // Change password
        await changePassword.enterNewPassword(newPassword);
        console.log(`New password entered: ${newPassword}`);

        await changePassword.enterConfirmPassword(newPassword);
        console.log(`Confirm password entered: ${newPassword}`);

        await changePassword.clickOnContinueButton();
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");

        // Logout
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        // Login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(credentials.randomEmail);
        console.log(`Email is used for login after password change: ${credentials.randomEmail}`);

        await loginPage.enterPassword(newPassword);
        console.log(`New password is used for login: ${newPassword}`);

        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

       
        await myAccountPage.clickOnChangePasswordLink();

    } finally {

        // Return to original password to keep test idempotent
        await changePassword.enterNewPassword(credentials.randomPassword);
        console.log(`Original password entered for reset: ${credentials.randomPassword}`);

        await changePassword.enterConfirmPassword(credentials.randomPassword);
        console.log(`Original confirm password entered for reset: ${credentials.randomPassword}`);

        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");
    }

});

    test('Try to Change Password with short password @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        const shortNewPassword = RandomDataProvider.getShortRandomPassword();
        
        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(credentials.randomPassword);
        await loginPage.clickOnLoginButton();

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with short password
        await changePassword.enterNewPassword(shortNewPassword);
        await changePassword.enterConfirmPassword(shortNewPassword);
        await changePassword.clickOnContinueButton();

        //Verify validation message for short password
        const passwordValidationErrorMessage = await changePassword.getPasswordValidationErrorMessage();
        expect(passwordValidationErrorMessage).toContain("Password must be between 4 and 20 characters!");

    });

    test('Try to Change Password with long password @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        const longNewPassword = RandomDataProvider.getLongRandomPassword();

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();  

        //Enter valid credentials
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(credentials.randomPassword);
        await loginPage.clickOnLoginButton(); 
    

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        try {

        //Change password with long password
        await changePassword.enterNewPassword(longNewPassword);
        await changePassword.enterConfirmPassword(longNewPassword);
        await changePassword.clickOnContinueButton();

        //It is possible to set long password (more then 20 characters), so the success message is verified
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");
        

        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(longNewPassword);
        await loginPage.clickOnLoginButton();

        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        
        
        await myAccountPage.clickOnChangePasswordLink();

        }finally {

        //Return an original password to keep test idempotent

        await changePassword.enterNewPassword(credentials.randomPassword);
        await changePassword.enterConfirmPassword(credentials.randomPassword);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");
        
        }
    });

    test('Try to Change password wih minimum length password @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        const minLengthNewPassword = RandomDataProvider.getMinLengthRandomPassword();


        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(credentials.randomPassword);
        await loginPage.clickOnLoginButton();
        
        // Wait for My Account page to load after login
        await page.waitForTimeout(2000);

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        try{

        //Change password with minimum length password
        await changePassword.enterNewPassword(minLengthNewPassword);
        await changePassword.enterConfirmPassword(minLengthNewPassword);
        await changePassword.clickOnContinueButton();

        //Verify success message
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");

        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(minLengthNewPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        

        
        await myAccountPage.clickOnChangePasswordLink();

        }finally {

        //Return an original password to keep test idempotent

        await changePassword.enterNewPassword(credentials.randomPassword);
        await changePassword.enterConfirmPassword(credentials.randomPassword);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");
        
    }

      });

    test('Try to Change password wih maximum length password @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        const maxLengthNewPassword = RandomDataProvider.getMaxLengthRandomPassword();
        
        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(credentials.randomPassword);
        await loginPage.clickOnLoginButton();
        
        // Wait for My Account page to load after login
        //await page.waitForTimeout(2000);

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        try {

        //Change password with maximum length password
        await changePassword.enterNewPassword(maxLengthNewPassword);
        await changePassword.enterConfirmPassword(maxLengthNewPassword);
        await changePassword.clickOnContinueButton();

        //Verify success message
        const successMessage = await myAccountPage.getSuccessMessageText();
        expect(successMessage).toContain("Success: Your password has been successfully updated.");


        //Logout after password change
        await homePage.clickOnMyAccount();
        await myAccountPage.clickOnLogoutLink();

        //Try to login with new password
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(maxLengthNewPassword);
        await loginPage.clickOnLoginButton();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();

        
        
        await myAccountPage.clickOnChangePasswordLink();

        }finally {

        //Return an original password to keep test idempotent
        await changePassword.enterNewPassword(credentials.randomPassword);
        await changePassword.enterConfirmPassword(credentials.randomPassword);
        await changePassword.clickOnContinueButton();
        const successMessageAfterReset = await myAccountPage.getSuccessMessageText();
        expect(successMessageAfterReset).toContain("Success: Your password has been successfully updated.");
        }
        
});

    test('Try to Change Password with mismatched confirm password @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        const randomNewPassword = RandomDataProvider.getRandomPassword();
        const mismatchedConfirmPassword = RandomDataProvider.getMismatchedRandomConfirmPassword();


        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        //Enter valid credentials
        await loginPage.enterEmailAddress(credentials.randomEmail);
        await loginPage.enterPassword(credentials.randomPassword);
        await loginPage.clickOnLoginButton();
        
        // Wait for My Account page to load after login
        await page.waitForTimeout(2000);

        //Navigate to Change Password page
        await myAccountPage.clickOnChangePasswordLink();

        //Change password with mismatched confirm password
        await changePassword.enterNewPassword(randomNewPassword);
        await changePassword.enterConfirmPassword(mismatchedConfirmPassword); 
        await changePassword.clickOnContinueButton();

        //Verify validation message for mismatched confirm password
        const confirmPasswordValidationErrorMessage = await changePassword.getConfirmPasswordValidationErrorMessage();
        expect(confirmPasswordValidationErrorMessage).toContain("Password confirmation does not match password!");

    });

});
