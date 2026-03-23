import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { NewsletterSubscriptionPage } from '../pages/NewsLetter';
import { MyWishListPage } from '../pages/MyWishList';
import { saveCredentials } from '../utils/testDataStore';
import { loadCredentials } from '../utils/testDataStore';

test.describe('Add Product to Wish List Tests', () => {

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

    test('Add Product to Wish List from Home Page @master', async ({ page, browserName }) => {

        const credentials = loadCredentials(browserName);
        if (!credentials) throw new Error('No credentials found.');

        //Login to the application
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        await page.locator('input[name="email"]').fill(credentials.randomEmail);
        await page.locator('input[name="password"]').fill(credentials.randomPassword);
        await page.locator('input[value="Login"]').click();

        //Click on Logo to navigate to Home Page
        await myAccountPage.clickOnLogo();

        await page.waitForTimeout(3000);

        //Add product to Wish List
        await homePage.addProductToWishList();

        //Click on Wish List link
        await homePage.clickOnWishListLink();

        await page.waitForTimeout(2000);

        //Verify that product is added to Wish List
        const productNames = await myWishListPage.getColumnValuesByHeader(
            page,
            'table[class="table table-bordered table-hover"]',
            'Product Name'
        );
        expect(productNames).toContain("Canon EOS 5D");

        //Remove product from Wish List
        await myWishListPage.clickOnRemoveButton();
        expect(await myWishListPage.getSuccessMessageText()).toContain("Success: You have modified your wish list!");

    })
    
});
