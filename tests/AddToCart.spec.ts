/**
 * Test Description: Add to Cart Test to verify adding a product to the shopping cart
 *
 * Test Steps:
 * 1. Navigate to the application URL
 * 2. Enter "iPhone" in the Search box
 * 3. Click on the Search button
 * 4. Click on the name of the product "iPhone"
 * 5. Change quantity from 1 to "2" in the input field Qty
 * 6. Click on the button Add to Cart
 * 7. Verify if this message appears "Success: You have added iPhone to your shopping cart!"
 * 8. Click on the Cart button in the upper right corner
 * 9. Verify name of product and quantity
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartItems } from "../pages/CartItems";
import { TestConfig } from "../test.config";

test.describe("Add to Cart Test Suite", () => {

    let homePage: HomePage;
    let searchResultsPage: SearchResultsPage;
    let productPage: ProductPage;
    let cartItems: CartItems;
    let testConfig: TestConfig

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        productPage = new ProductPage(page);
        cartItems = new CartItems(page);
        testConfig = new TestConfig();
        await page.goto("https://tutorialsninja.com/demo/");
    });

    //test.afterEach(async ({ page }) => {
        //await page.close();
    //});

    test("Add single product to shopping cart @master" , async ({ page }) => {
        // Step 2: Enter "iPhone" in the Search box
        await homePage.searchProduct(testConfig.mobileProductName);

        // Step 4: Click on the name of the product "iPhone"
        //await searchResultsPage.getProductTitleText();
        //await page.waitForTimeout(2000);

        await page.locator('a:has-text("iPhone")').click();

        // Step 5: Enter quantity in the input field Qty
        await productPage.changeQuantity(testConfig.singleProductQuantity);

        // Step 6: Click on the button Add to Cart
        await productPage.clickAddToCart();
        //await page.waitForTimeout(3000);

        // Step 7: Verify if this message appears "Success: You have added iPhone to your shopping cart!"
        const successMessage = await productPage.getSuccessMessage();
        expect(successMessage).toContain("Success: You have added iPhone to your shopping cart!");

        // Step 8: Click on the Cart button in the upper right corner
        await homePage.clickOnCartButton();

        // Step 9: Verify name of product, quantity and price in cart

        const priceOfProduct = await productPage.getProductPrice();
        const cartProductName = await cartItems.getNameInCart();
        const cartProductQuantity = await cartItems.getQuantityInCart();
        const priceOfProductInCart = await cartItems.getPriceInCart();

        expect(cartProductName).toContain("iPhone");
        expect(cartProductQuantity).toContain("1");
        expect(priceOfProduct).toBe(priceOfProductInCart);

        await cartItems.clickOnXButton();

        //await page.waitForTimeout(3000);


    });

    test("Add multiple products to shopping cart @master", async ({ page }) => {
        // Search and add iPhone to the cart
        await homePage.searchProduct(testConfig.mobileProductName);
        await searchResultsPage.clickOnAddToCartBtn();

        let successMessage = await productPage.getSuccessMessage();
        expect(successMessage).toContain("Success");

        // Search and add MacBook Air to the cart
        await homePage.searchProduct(testConfig.laptopProductName);
        await searchResultsPage.clickOnAddToCartBtn();

        successMessage = await productPage.getSuccessMessage();
        expect(successMessage).toContain("Success");

        // Open the cart
        await homePage.clickOnCartButton();

        //await page.waitForTimeout(4000);

        // Verify both products are in the cart
        const cartProductNames = await cartItems.getAllCartProductNames();
        console.log(cartProductNames);
        expect(cartProductNames).toContain(testConfig.mobileProductName);
        expect(cartProductNames).toContain(testConfig.laptopProductName);

    });
});
