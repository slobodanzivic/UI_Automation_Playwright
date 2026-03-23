/**
 *  Test Description: Logout Test to verify that a user can successfully log out from the application
 * 
    Test steps:
    1. Navigate to the application URL
    2. Log in using valid credentials
    3. Click on the "My Account" link
    3. Click on the Logout option
    4. Verify that the user is logged out successfully 

 * Test Tags: @master
 */ 

import { test, expect, Page } from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { LogoutConfirmationPage } from "../pages/LogoutConfirmationPage";
import { saveCredentials } from '../utils/testDataStore';
import { loadCredentials } from '../utils/testDataStore';


//Declare variables
let testConfig: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutConfirmationPage: LogoutConfirmationPage;

test.beforeEach(async ({ page }) => {
    //Initialize variables
    testConfig = new TestConfig();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutConfirmationPage = new LogoutConfirmationPage(page);
    await page.goto(testConfig.appUrl);
})

//test.afterEach(async ({ page }) => {
    //await page.waitForTimeout(3000);
    //await page.close();
//})  
test('Logout Test @master', async ({ page, browserName }) => {

    const credentials = loadCredentials(browserName);
    if (!credentials) throw new Error('No credentials found.');

    //Login steps
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();

    await loginPage.clickOnEmailInput();
    await loginPage.enterEmailAddress(credentials.randomEmail);

    await loginPage.clickOnPasswordInput(); 
    await loginPage.enterPassword(credentials.randomPassword);

    await loginPage.clickOnLoginButton();
    

    //Logout steps
    await homePage.clickOnMyAccount()
    await myAccountPage.clickOnLogoutLink();

   //Assertion to verify successful logout
   const logoutMessageText = await logoutConfirmationPage.getLogoutConfirmationMessageText();
   expect(logoutMessageText).toBe("Account Logout");
})