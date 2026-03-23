/**
 * Test Description: Registration Test to verify that a user can successfully register to the application
 * 
    Test steps:
    1. Navigate to the application URL
    2. Click on the "My Account" link
    3. Click on the "Register" option
    4. Fill in the registration form with valid details
    5. Click on the radio button to subscribe to the newsletter (Yes/No)
    6. Accept the privacy policy
    7. Click on the "Continue" button
    8. Verify that the user is registered successfully by checking the confirmation message
 */

import{test,expect,Page}from"@playwright/test";
import { HomePage } from "../pages/HomePage";
import{TestConfig}from"../test.config"; 
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataProvider } from "../utils/randomDataProvider";
import { RegistrationConfirmationPage } from "../pages/RegistrationConfirmationPage";
import { saveCredentials} from "../utils/testDataStore";

//Declare variables
let testConfig:TestConfig;
let homePage:HomePage;
let registrationPage:RegistrationPage;
let registrationConfirmationPage:RegistrationConfirmationPage;


test.beforeEach(async({page})=>{
    //Initialize variables
    testConfig = new TestConfig();
    homePage=new HomePage(page);
    registrationPage=new RegistrationPage(page);
    registrationConfirmationPage=new RegistrationConfirmationPage(page);
    await page.goto(testConfig.appUrl);
})

//test.afterEach(async({page})=>{
    //await page.waitForTimeout(1000);
//})


test('Register to the application @master',async({page,browserName})=>{ 

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

    const passwordText = await registrationPage.getPasswordInputText();

    await registrationPage.clickOnConfirmPasswordInput();
    await registrationPage.enterConfirmPassword(passwordText);

    await registrationPage.selectNewsletter(false);
    await registrationPage.acceptPrivacyPolicy();

    await registrationPage.clickContinue();

    await page.waitForTimeout(5000);

    //Assertion to verify successful registration 
    const confirmationMessageText = await registrationConfirmationPage.getConfirmationMessageText();
    expect(confirmationMessageText).toBe("Your Account Has Been Created!");

    
    // Save the registered email and password to the TestDataStore for later use in login tests
    saveCredentials(randomEmail, randomPassword, browserName);

    console.log("Saved random email and password to TestDataStore for later use in login tests." + randomEmail + " | " + randomPassword);



})



