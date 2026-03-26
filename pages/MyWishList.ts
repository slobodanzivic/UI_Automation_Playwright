import { Page, Locator } from '@playwright/test';

export class MyWishListPage {
    private readonly page: Page;

    // Locators
    private readonly wishListTable: Locator;
    private readonly productName: Locator;
    private readonly removeButton: Locator;
    private readonly tableSelector: Locator
    private readonly successMessage: Locator;
    private readonly emptyWishListMessage: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.wishListTable = page.locator('table[class="table table-bordered table-hover"]');
        this.productName = page.locator('table.table tbody tr td:nth-child(2) a');
        this.removeButton = page.locator('a[data-original-title="Remove"]');
        this.tableSelector = page.locator('table[class="table table-bordered table-hover"]');
        this.successMessage = page.locator('div.alert');
        this.emptyWishListMessage = page.locator('div#content p');
    }

    //Get text from product name in Wish List
    async getProductNameText(): Promise<string> {
        return await this.productName.textContent() || "";
    }

    //Click on Remove button to remove product from Wish List
    async clickOnRemoveButton(): Promise<void> {
        await this.removeButton.click();
    }

    //Get text from success message
    async getSuccessMessageText(): Promise<string> {
        return await this.successMessage.textContent() || "";
    }

    //Get text from empty Wish List message
    async getEmptyWishListMessageText(): Promise<string> {
        return await this.emptyWishListMessage.textContent() || "";
    }

    async getColumnValuesByHeader(
        page: Page,               // Playwright Page object
        tableSelector: string,    // CSS selector of the table (e.g., 'table' or '.products-table')
        headerName: string        // Name of header column  
    ): Promise<string[]> {

        // 1. FINDING THE COLUMN INDEX BY HEADER NAME 

        // Finding all header columns (th) in the table's thead (chaining locators)
        const headers = page.locator(`${tableSelector} thead tr td`);

        // Number of header columns in the table
        const headerCount = await headers.count();

        // Variable to store the column index
        // Initial value -1 means "not found"
        let columnIndex = -1;

        // Loop through all header columns
        for (let i = 0; i < headerCount; i++) {

            // Get the text of the current header and trim whitespace
            const text = (await headers.nth(i).innerText()).trim();

            // If the header text matches the desired column name
            if (text === headerName) {
                // Store the column index
                columnIndex = i;
                // Break the loop since we found what we need
                break;
            }
        }

        // If no header had the desired name
        if (columnIndex === -1) {
            // Throw an error so the test clearly fails
            throw new Error(`Header "${headerName}" not found in table`);
        }

        // 2. FINDING TABLE ROWS (tbody)

        // Find all rows in <tbody>
        const rows = page.locator(`${tableSelector} tbody tr`);

        // Number of rows in the table
        const rowCount = await rows.count();

        // Array to store the values from the column
        const values: string[] = [];

        // Loop through each row
        for (let i = 0; i < rowCount; i++) {

            // In each row:
            // 1. find all <td> cells
            // 2. take the cell with the index of the found column
            const cell = rows.nth(i).locator('td').nth(columnIndex);

            // Get the text from the cell, trim whitespace
            // and add it to the array
            values.push((await cell.innerText()).trim());
        }

        // 3. RETURN VALUE

        // Return the array of all values from the requested column
        return values;
    }

}
