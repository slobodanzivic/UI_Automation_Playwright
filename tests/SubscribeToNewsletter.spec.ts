import {test,expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {MyAccountPage} from "../pages/MyAccountPage"
import {TestConfig} from "../test.config"
import {NewsletterSubscriptionPage} from "../pages/NewsLetter"  
import { loadCredentials } from '../utils/testDataStore';


test.describe('Newsletter Subscription Tests',()=>{

    let homePage:HomePage;
    let myAccountPage:MyAccountPage;
    let newsletterSubscriptionPage:NewsletterSubscriptionPage;
    let testConfig:TestConfig;


    test.beforeEach(async ({ page }) => {

        //Create page objects
        homePage=new HomePage(page);
        myAccountPage=new MyAccountPage(page);
        newsletterSubscriptionPage=new NewsletterSubscriptionPage(page);
        testConfig=new TestConfig();
        await page.goto(testConfig.appUrl);
    });

    //test.afterEach(async ({ page }) => {
       // await page.close();
    //}); 


    test('Subscribe to Newsletter from My Account Page @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await page.locator('input[name="email"]').fill(credentials.randomEmail);
        await page.locator('input[name="password"]').fill(credentials.randomPassword);
        await page.locator('input[value="Login"]').click();

        //Click on "Subscribe / unsubscribe to newsletter" link
        await myAccountPage.clickOnSubUnsubToNewsletter();

        //Select Yes for Newsletter Subscription
        await newsletterSubscriptionPage.selectYesForNewsletterSubscription();
        
        //Click on Continue button
        await newsletterSubscriptionPage.clickOnContinueButton();

        //Verify success message
        const successMessageText=await newsletterSubscriptionPage.getSuccessMessageText();
        expect(successMessageText).toContain("Success: Your newsletter subscription has been successfully updated!");
    });

    test('Unsubscribe from Newsletter from My Account Page @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');
        
        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await page.locator('input[name="email"]').fill(credentials.randomEmail);
        await page.locator('input[name="password"]').fill(credentials.randomPassword);
        await page.locator('input[value="Login"]').click();

        //Click on "Subscribe / unsubscribe to newsletter" link
        await myAccountPage.clickOnSubUnsubToNewsletter();

        //Select No for Newsletter Subscription
        await newsletterSubscriptionPage.selectNoForNewsletterSubscription();

        //Click on Continue button
        await newsletterSubscriptionPage.clickOnContinueButton();

        //Verify success message
        const successMessageText=await newsletterSubscriptionPage.getSuccessMessageText();
        expect(successMessageText).toContain("Success: Your newsletter subscription has been successfully updated!");
    });

});
