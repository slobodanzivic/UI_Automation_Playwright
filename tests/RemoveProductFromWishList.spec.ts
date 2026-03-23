import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { NewsletterSubscriptionPage } from '../pages/NewsLetter';
import { MyWishListPage } from '../pages/MyWishList';
import { saveCredentials } from '../utils/testDataStore';
import { loadCredentials } from '../utils/testDataStore';

test.describe('Remove Product from Wish List Tests', () => {

    let homePage: HomePage;
    let myAccountPage: MyAccountPage;
    let newsletterSubscriptionPage: NewsletterSubscriptionPage;
    let testConfig: TestConfig;
    let myWishListPage: MyWishListPage;


    test.beforeEach(async ({ page }) => {
        //Create page objects
        homePage = new HomePage(page);
        myAccountPage = new MyAccountPage(page);
        newsletterSubscriptionPage = new NewsletterSubscriptionPage(page);
        myWishListPage = new MyWishListPage(page);
        testConfig = new TestConfig();
        await page.goto(testConfig.appUrl);
    });

    //test.afterEach(async ({ page }) => {
        //await page.close();
    //});


    test('Remove Product from Wish List from My Wish List Page @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        //Login to the application  
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await page.locator('input[name="email"]').fill(credentials.randomEmail);
        await page.locator('input[name="password"]').fill(credentials.randomPassword);
        await page.locator('input[value="Login"]').click();
        await page.waitForTimeout(2000);

        //Click on Logo to navigate to Home Page
        await myAccountPage.clickOnLogo();
        await page.waitForTimeout(3000);
        //Add product to Wish List
        await homePage.addProductToWishList();

        //Click on Wish List link
        await homePage.clickOnWishListLink();
        await page.waitForTimeout(2000);

        //Remove product from Wish List
        await myWishListPage.clickOnRemoveButton();
        await page.waitForTimeout(2000);

        //Verify success message
        const emptyMessageText = await myWishListPage.getEmptyWishListMessageText();

        expect(emptyMessageText).toContain("Your wish list is empty.");
        expect (await homePage.isWishListZeroVisible()).toBeTruthy();

    });

});
