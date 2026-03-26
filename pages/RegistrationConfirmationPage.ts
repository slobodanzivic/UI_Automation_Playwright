import { Page, Locator } from "@playwright/test";

export class RegistrationConfirmationPage {

    //Page instance
    private readonly page: Page;

    // Locators
    private readonly confirmationMessage: Locator;

    // Initialize locators in the constructor
    constructor(page: Page) {
        this.page = page;
        this.confirmationMessage = page.locator("div[id='content'] h1");
    }

    //Get confirmation message text
    async getConfirmationMessageText(): Promise<string> {
        try {
            return await this.confirmationMessage.textContent() ?? "";
        }
        catch (error) {
            console.log(`Exception occured while getting confirmation message text: ${error}`);
            throw error;
        }
    }
}
