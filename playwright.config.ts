import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
timeout: 60 * 1000, //60000 ms (60 secs)
testDir: './tests',
fullyParallel: false,
//retries: process.env.CI ? 2 : 0,
retries: 1,
//workers: process.env.CI ? 3 : undefined,
workers: 3,


reporter: [
['html'],
['allure-playwright'],
['dot'],
['list']
],

use: {
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure',



//headless: false,
viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
},

//grep: /@master/,



projects: [

    

    // ✅ CHROMIUM
    { name: 'chrome-registration', testMatch: 'Registration.spec.ts', use: { ...devices['Desktop Chrome'] } },
    { name: 'chrome-login', testMatch: 'LoginDataDriven.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-registration'] },
    { name: 'chrome-addProductTowishlist', testMatch: 'AddProductToWishList.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-login'] },
    { name: 'chrome-addToCart', testMatch: 'AddToCart.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-addProductTowishlist'] },
    { name: 'chrome-forgotPassword', testMatch: 'ForgotPassword.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-addToCart'] },
    { name: 'chrome-logout', testMatch: 'Logout.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-forgotPassword'] },
    { name: 'chrome-removeProductFromWishlist', testMatch: 'RemoveProductFromWishList.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-logout'] },
    { name: 'chrome-search', testMatch: 'Search.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-removeProductFromWishlist'] },
    { name: 'chrome-subscribeToNewsletter', testMatch: 'SubscribeToNewsletter.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-search'] },
    { name: 'chrome-change-password', testMatch: 'ChangePassword.spec.ts', use: { ...devices['Desktop Chrome'] }, dependencies: ['chrome-subscribeToNewsletter'] },


    //✅ FIREFOX
    { name: 'firefox-registration', testMatch: 'Registration.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 } },
    { name: 'firefox-login', testMatch: 'LoginDataDriven.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-registration'] },
    { name: 'firefox-addProductTowishlist', testMatch: 'AddProductToWishList.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-login'] },
    { name: 'firefox-addToCart', testMatch: 'AddToCart.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-addProductTowishlist'] },
    { name: 'firefox-forgotPassword', testMatch: 'ForgotPassword.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-addToCart'] },
    { name: 'firefox-logout', testMatch: 'Logout.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-forgotPassword'] },
    { name: 'firefox-removeProductFromWishlist', testMatch: 'RemoveProductFromWishList.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-logout'] },
    { name: 'firefox-search', testMatch: 'Search.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-removeProductFromWishlist'] },
    { name: 'firefox-subscribeToNewsletter', testMatch: 'SubscribeToNewsletter.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-search'] },
    { name: 'firefox-change-password', testMatch: 'ChangePassword.spec.ts', use: { ...devices['Desktop Firefox'], actionTimeout: 12000 }, dependencies: ['firefox-subscribeToNewsletter'] },



    
    // ✅ WEBKIT
    { name: 'webkit-registration', testMatch: 'Registration.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 } },
    { name: 'webkit-login', testMatch: 'LoginDataDriven.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-registration'] },
    { name: 'webkit-addProductTowishlist', testMatch: 'AddProductToWishList.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-login'] },
    { name: 'webkit-addToCart', testMatch: 'AddToCart.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-addProductTowishlist'] },
    { name: 'webkit-forgotPassword', testMatch: 'ForgotPassword.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-addToCart'] },
    { name: 'webkit-logout', testMatch: 'Logout.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-forgotPassword'] },
    { name: 'webkit-removeProductFromWishlist', testMatch: 'RemoveProductFromWishList.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-logout'] },
    { name: 'webkit-search', testMatch: 'Search.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-removeProductFromWishlist'] },
    { name: 'webkit-subscribeToNewsletter', testMatch: 'SubscribeToNewsletter.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-search'] },
    { name: 'webkit-change-password', testMatch: 'ChangePassword.spec.ts', use: { ...devices['Desktop Safari'], actionTimeout: 30000 }, dependencies: ['webkit-subscribeToNewsletter'] },
   



/*
projects: [

{
name: 'chromium',
use: { ...devices['Desktop Chrome'] },
},

{
name: 'firefox',
use: { ...devices['Desktop Firefox'] },
},

{
name: 'webkit',
use: { ...devices['Desktop Safari'] },
}


]
*/
]



});


