import { Page, Locator } from "@playwright/test"

export class HomePage {

    private readonly page: Page;

    //Locators
    private readonly myAccountLink: Locator;
    private readonly myAccountInDropdown: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly cartButton: Locator;
    private readonly commonProductName: Locator;
    private readonly commonAddToWishListButton: Locator;
    private readonly wishListLink: Locator; 
    private readonly wishListZero: Locator;
    


    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = page.locator('a[title="My Account"] span[class="hidden-xs hidden-sm hidden-md"]');
        this.myAccountInDropdown = page.locator('li[class="dropdown open"] ul li:nth-child(1) a');
        this.registerLink = page.locator('a[href="https://tutorialsninja.com/demo/index.php?route=account/register"]');
        this.loginLink = page.locator('li[class=\'dropdown open\'] li:nth-child(2) a:nth-child(1)');
        this.searchBox = page.locator('input[placeholder="Search"]');
        this.searchButton = page.locator('button[class="btn btn-default btn-lg"]');
        this.cartButton = page.locator('#cart');
        this.commonProductName = page.locator('div.caption h4 a');
        this.commonAddToWishListButton = page.locator('button[data-original-title="Add to Wish List"]');
        this.wishListLink = page.locator('a[id="wishlist-total"] span[class="hidden-xs hidden-sm hidden-md"]');
        this.wishListZero = page.locator('div#top-links ul li:nth-child(3) a span', {hasText:"Wish List (0)"});
    }

    async isHomePageExists() {
        const pageTitle: String = await this.page.title();
        if (pageTitle) {
            return true;
        }
        return false;
    }

    //Click on My Account link
    async clickOnMyAccount() {
        try {
            await this.myAccountLink.click();

        }

        catch (error) {
            console.log(`Exeption occured while clicking on 'My Account': ${error}`)
            throw error;
        }
    }

    //Click on Register link
    async clickOnRegister() {

        try {
            await this.registerLink.click();
        }
        catch (error) {
            console.log(`Expetion occured while clicking on 'Register': ${error}`)
            throw error;
        }
    }

    //Click on Login link
    async clickOnLogin() {

        try {
            await this.loginLink.click();
        }
        catch (error) {
            console.log(`Exeption occured while clicking on 'Login': ${error}`)
            throw error;
        }

    }

    //Click on Search Box, enter product name and click on Search Button
    async searchProduct(productName: string) {
        try {
            await this.searchBox.click();
            await this.searchBox.fill(productName);
            await this.searchButton.click();
        }
        catch (error) {
            console.log(`Exeption occured while searching for product '${productName}': ${error}`)
            throw error;
        }
    }

    //Click on Cart Button
    async clickOnCartButton() {
        try {
            await this.cartButton.click();
        }
        catch (error) {
            console.log(`Exeption occured while clicking on 'Cart' button: ${error}`)
            throw error;
        }

    }

    //Click on My Account in Dropdown
    async clickOnMyAccountInDropdown() {
        await this.myAccountInDropdown.click();
    }

    //Click on ProductName
    async clickOnProductName(){
        await this.commonProductName.waitFor({ state: "visible" });
        await this.commonProductName.click();
    }

    //Click on Wish List link
    async clickOnWishListLink(){
        await this.wishListLink.click();
    }   

    //Is locator wishListZero visible   
    async isWishListZeroVisible(): Promise<boolean> {
        return await this.wishListZero.isVisible();
    }
    
    async addProductToWishList() {

        const productCount = await this.commonProductName.count();
        console.log("Total products on Home Page: " + productCount);

        for (let index = 0; index < productCount; index++) {
            const name = await this.commonProductName.nth(index).textContent();

            if (name && name.trim().toLowerCase() === "canon eos 5d") {
                await this.commonAddToWishListButton.nth(index).click();
                break;
            }
        }
    }
}
