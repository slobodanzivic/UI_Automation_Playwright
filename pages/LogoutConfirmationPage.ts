import { Page, Locator } from "@playwright/test";

export class LogoutConfirmationPage {
    //Page instance
    private readonly page: Page;

    // Locators
    private readonly logoutConfirmationMessage: Locator;

    // Initialize locators in the constructor
    constructor(page: Page) {
        this.page = page;
        this.logoutConfirmationMessage = page.locator("div[id='content'] h1");
    }

    //Get logout confirmation message text
    async getLogoutConfirmationMessageText(): Promise<string> {
        try {
            return await this.logoutConfirmationMessage.textContent() ?? "";
        } catch (error) {
            console.log(`Exception occured while getting logout confirmation message text: ${error}`);
            throw error;
        }
    }
}
