import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from '../pages/LoginPage';
import { RandomDataProvider } from '../utils/randomDataProvider';
import { RegistrationConfirmationPage } from '../pages/RegistrationConfirmationPage';
import { TestConfig } from '../test.config';
import { MyAccountPage } from '../pages/MyAccountPage';



let homePage: HomePage;
let registrationPage: RegistrationPage;
let loginPage: LoginPage;
let registrationConfirmationPage: RegistrationConfirmationPage;
let testConfig: TestConfig;
let myAccountPage: MyAccountPage;



test.beforeEach(async({page})=>{
    //Initialize variables
    homePage=new HomePage(page);
    registrationPage=new RegistrationPage(page);
    registrationConfirmationPage=new RegistrationConfirmationPage(page);
    loginPage = new LoginPage(page);
    testConfig = new TestConfig();
    myAccountPage = new MyAccountPage(page);
    await page.goto(testConfig.appUrl);
})

test('Login with valid credentials @master',async({page})=>{

    // Add further registration steps here
    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();

    await registrationPage.clickOnFirstNameInput();
    await registrationPage.enterFirstName(RandomDataProvider.getRandomFirstName());

    await registrationPage.clickOnLastNameInput();
    await registrationPage.enterLastName(RandomDataProvider.getRandomLastName());

    // Generate a random email address for registration and store it in a variable 'randomEmail' for later use
    await registrationPage.clickOnEmailInput();
    const randomEmail = RandomDataProvider.getRandomEmail();
    await registrationPage.enterEmailAddress(randomEmail);
    console.log("Generated random email for registration: " + randomEmail); 

    await registrationPage.clickOnTelephoneInput();
    await registrationPage.enterTelephone(RandomDataProvider.getRandomTelephone());

    // Generate a random password for registration and store it in a variable 'randomPassword' for later use
    await registrationPage.clickOnPasswordInput();
    const randomPassword = RandomDataProvider.getRandomPassword();
    await registrationPage.enterPassword(randomPassword);
    console.log("Generated random password for registration: " + randomPassword);

    await registrationPage.clickOnConfirmPasswordInput();
    await registrationPage.enterConfirmPassword(randomPassword);

    await registrationPage.selectNewsletter(true);
    await registrationPage.acceptPrivacyPolicy();
    await registrationPage.clickContinue();

    await page.waitForTimeout(3000);

    //Validate registration success message
    const successMessageText = await registrationConfirmationPage.getConfirmationMessageText();
    expect(successMessageText).toContain("Your Account Has Been Created!");

    //Login with the registered credentials
    await homePage.clickOnMyAccount();
    await myAccountPage.clickOnLogoutLink();

    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();

    await loginPage.clickOnEmailInput();
    await loginPage.enterEmailAddress(randomEmail);
    console.log("Email used for login: " + randomEmail);

    await loginPage.clickOnPasswordInput();
    await loginPage.enterPassword(randomPassword);
    console.log("Password used for login: " + randomPassword);

    await loginPage.clickOnLoginButton();
    await page.waitForTimeout(3000);

    //Assertion to verify successful login by checking the presence of "My Account" heading on the page
    const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
    expect(isMyAccountPageDisplayed).toBeTruthy();

});
