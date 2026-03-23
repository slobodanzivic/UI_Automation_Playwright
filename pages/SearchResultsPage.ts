import {Page, Locator} from "@playwright/test"

export class SearchResultsPage{
    
    
    private readonly page:Page;

    //Locators
    private readonly searchResultsHeader:Locator;
    private readonly confirmationMessage:Locator;   
    private readonly productTitle:Locator;
    private readonly greyAddToCartBtn: Locator;

    //Constructor
    constructor(page:Page){
        this.page=page;
        this.searchResultsHeader=page.locator('div#content h1');
        this.confirmationMessage=page.locator('//p[contains(text(),"There is no product that matches the search criteria.")]');
        this.productTitle=page.locator('div.caption h4 a');
        //this.greyAddToCartBtn=page.locator("button[type='button'] span[class='hidden-xs hidden-sm hidden-md']");
        this.greyAddToCartBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
    }

    //Get Search Results Header Text
    async getSearchResultsHeaderText():Promise<string>{
        return await this.searchResultsHeader.textContent() || "";
    }   
    
    //Get Confirmation Message Text
    async getConfirmationMessageText():Promise<string>{
        return await this.confirmationMessage.textContent() || "";
    }

    //Get Product Title Text
    async getProductTitleText():Promise<string>{
        return await this.productTitle.textContent() || "";
    }
    
    //Click on greyAddtoCartBtn
    async clickOnAddToCartBtn(){
        await this.greyAddToCartBtn.click();
    }
}
