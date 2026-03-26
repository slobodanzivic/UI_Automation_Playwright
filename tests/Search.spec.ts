/**
 * Test description: Search Functionality Test Suite to verify the search feature of the application
 * 
 * Tests steps:
 * 1. Navigate to the application URL   
 * 2. Search for a product using valid product names (monitor, camera, tablet)
 * 3. Verify that the search results header and product title contain the searched product name
 * 4. Search for a product using an empty input
 * 5. Verify that the appropriate confirmation message is displayed for no search results
 * 
 * Test Tags: @master
 * 
 */

import{test, expect, Page} from "@playwright/test"
import { HomePage } from "../pages/HomePage";   
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { afterEach } from "node:test";

test.describe("Search Functionality Test Suite @master",()=>{

    let homePage:HomePage;
    let testConfig:TestConfig;
    let searchResultsPage: SearchResultsPage;


    test.beforeEach(async({page})=>{
        testConfig=new TestConfig();
        homePage=new HomePage(page);
        searchResultsPage=new SearchResultsPage(page);
        
        await page.goto("https://tutorialsninja.com/demo/");
    });


   


    test("Search Product Test: Searching for monitor",async({page})=>{

        await homePage.searchProduct(testConfig.monitorProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.monitorProductName);
        console.log(`Search results header contains product name: ${testConfig.monitorProductName}`);

        expect (await searchResultsPage.getProductTitleText()).toContain(testConfig.monitorProductName);
        console.log(`Product title contains product name: ${testConfig.monitorProductName}`);

    })

    test("Search Product Test: Searching for camera",async({page})=>{

        await homePage.searchProduct(testConfig.cameraProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.cameraProductName);
        console.log(`Search results header contains product name: ${testConfig.cameraProductName}`);

        expect (await searchResultsPage.getProductTitleText()).toContain(testConfig.cameraProductName);
        console.log(`Product title contains product name: ${testConfig.cameraProductName}`);
        

    })

    test("Search Product Test: Searching for tablet",async({page})=>{

        await homePage.searchProduct(testConfig.tabletProductName);
        expect (await searchResultsPage.getSearchResultsHeaderText()).toContain(testConfig.tabletProductName);
        console.log(`Search results header contains product name: ${testConfig.tabletProductName}`);    

        expect (await searchResultsPage.getProductTitleText()).toContain(testConfig.tabletProductName);
        console.log(`Product title contains product name: ${testConfig.tabletProductName}`);   

    })

    test("Search Product Test: Search with empty input",async({page})=>{

        await homePage.searchProduct(testConfig.emptyProductName);
        expect (await searchResultsPage.getConfirmationMessageText()).toContain("There is no product that matches the search criteria.");
        console.log(`Search results header contains text: 'There is no product that matches the search criteria.'`);
        
    })

});
