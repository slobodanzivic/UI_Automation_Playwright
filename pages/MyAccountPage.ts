import{Page, Locator} from "@playwright/test"

export class MyAccountPage{

    private readonly page:Page;

    //Locators
    private readonly MyAccount:Locator;
    private readonly LogoutLink:Locator;
    private readonly EditAccountInformationLink:Locator;
    private readonly ChangePasswordLink:Locator;
    private readonly ModifyAddressBookEntriesLink:Locator;
    private readonly ModifyYourWishList:Locator;
    private readonly successMessage:Locator;
    private readonly subUnsubToNewsletter:Locator;
    private readonly logo :Locator;

    //Constructor
    constructor(page:Page)      
    {
        this.page=page;
        this.MyAccount=page.locator('//h2[normalize-space()="My Account"]');
        this.LogoutLink=page.locator("li[class='dropdown open'] li:nth-child(5) a");
        this.EditAccountInformationLink=page.locator('//a[normalize-space()="Edit your account information"]');
        this.ChangePasswordLink=page.locator('//a[normalize-space()="Change your password"]');
        this.ModifyAddressBookEntriesLink=page.locator('//a[normalize-space()="Modify your address book entries"]');
        this.ModifyYourWishList=page.locator('//a[normalize-space()="Modify your wish list"]');
        this.successMessage=page.locator('.alert.alert-success.alert-dismissible');
        this.subUnsubToNewsletter=page.getByText("Subscribe / unsubscribe to newsletter");
        this.logo=page.locator('div#logo h1 a');

    }

    //Navigate directly to My Account page URL
    async navigateToMyAccountPage(): Promise<void>
    {
        await this.page.goto('https://tutorialsninja.com/demo/index.php?route=account/account');
    }

    //Verify My Account page is displayed
    async isMyAccountPageExists() 
    {
        const pageTitle:String=await this.page.title();
        ///console.log("My Account Page Title: " + pageTitle);

        if(pageTitle.includes("My Account"))
        {
            return true;
        }
        return false;
    }

    //Get My Account page heading text
    async getMyAccountPageHeadingText():Promise<string>
    {
        return await this.MyAccount.textContent() || "";
    }
    

    //Click on Logout link
    async clickOnLogoutLink():Promise<void>
    {
        await this.LogoutLink.click();
    }   
    
    //Click on "Edit your account information" link
    async clickOnEditAccountInformationLink():Promise<void>
    {
        await this.EditAccountInformationLink.click();
    }
    
    //Click on "Change your password" link
    async clickOnChangePasswordLink():Promise<void>
    {
        await this.ChangePasswordLink.click();
    }
    
    //Click on "Modify your address book entries" link
    async clickOnModifyAddressBookEntriesLink():Promise<void>
    {
        await this.ModifyAddressBookEntriesLink.click();
    }

    //Click on "Modify your wish list" link
    async clickOnModifyYourWishList():Promise<void>
    {
        await this.ModifyYourWishList.click();
    }

    //Get success message text after updating account information
    async getSuccessMessageText():Promise<string>
    {
        return await this.successMessage.textContent() || "";
    }   

    //Click on "Subscribe / unsubscribe to newsletter" link
    async clickOnSubUnsubToNewsletter():Promise<void>
    {
        await this.subUnsubToNewsletter.click();
    }   

    //click on the Logo to navigate to Home Page
    async clickOnLogo():Promise<void>
    {
        await this.logo.click();    

    }
}

