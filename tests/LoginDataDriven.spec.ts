/**
 * Test Description: Data Driven Login Test using JSON data provider
 * 
 * Test Steps:
 * 1. Navigate to the application URL
 * 2. Click on the "My Account" link    
 * 3. Click on the "Login" option
 * 4. Enter email address and password from JSON data file
 * 5. Click on the "Login" button
 * 6. Verify successful login or error message based on the input data
 * 
 * Test Tags: @master
 */

import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";


const jsonPath = "testdata/logindata.json";
const jsonTestdata = DataProvider.getDataFromJson(jsonPath);


test.describe("Data Driven Login Test Suite @master", () => {       

for (const data of jsonTestdata) {

    test(`Login test with data from JSON file: ${data.testName} @master` , async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const testConfig = new TestConfig();
        const myAccountPage = new MyAccountPage(page);

        await page.goto(testConfig.appUrl);
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();

        await loginPage.clickOnEmailInput();
        await loginPage.enterEmailAddress(data.email);

        await loginPage.clickOnPasswordInput();
        await loginPage.enterPassword(data.password);

        await loginPage.clickOnLoginButton();


        if (data.expectedResult.toLowerCase() === "success") {
        
            expect (await myAccountPage.getMyAccountPageHeadingText()).toBe("My Account");
            console.log("Ušao u IF");

        }
        else if (data.expectedResult.toLowerCase() === "fail")
        {
            const errorMessage = (await loginPage.getloginErrorMessage())?.trim();
            expect(
                errorMessage ===("Warning: No match for E-Mail Address and/or Password.") ||
                errorMessage ===("Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.")
            ).toBeTruthy();
            console.log("Ušao u ELSE IF");
        }

    })
}

});
