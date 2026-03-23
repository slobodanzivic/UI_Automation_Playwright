import { Page, Locator } from "@playwright/test";

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly successMessage: Locator;
  private readonly productPrice: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.locator('input[name="quantity"]');
    this.addToCartButton = page.locator('button#button-cart');
    this.successMessage = page.locator('div.alert.alert-success');
    this.productPrice = page.locator('ul[class="list-unstyled"] li h2');
  }

  // Change product quantity
  async changeQuantity(quantity: string) {
    await this.quantityInput.fill(quantity);
  }

  // Click Add to Cart button
  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  // Get success message text
  async getSuccessMessage(): Promise<string> {
    await this.successMessage.waitFor({ state: "visible" });
    return (await this.successMessage.textContent()) || "";
  }

  // Get product price
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || "";
  }
}