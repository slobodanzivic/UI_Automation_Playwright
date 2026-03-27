# UI Automation Playwright

A comprehensive UI automation testing framework built with **Playwright** for end-to-end testing of e-commerce web applications. The project follows the **Page Object Model (POM)** design pattern and supports multiple browsers with detailed reporting capabilities.

## 🎯 Project Overview

This project automates testing for critical e-commerce workflows including:

- **User Registration & Authentication** - Registration flow, login (valid/invalid credentials), password management
- **Product Management** - Search, add to wishlist, remove from wishlist, add to cart
- **Account Operations** - Change password, logout, account navigation
- **Additional Features** - Newsletter subscription

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Playwright Test | ^1.58.2 | Test automation framework |
| TypeScript | - | Type-safe test code |
| Allure Reporter | ^3.4.5 | Advanced test reporting |
| Faker.js | ^10.2.0 | Test data generation |
| XLSX | ^0.18.5 | Excel data handling |
| CSV-Parse | ^6.1.0 | CSV data processing |

## 📂 Project Structure

```
├── tests/                          # Test specifications
│   ├── AddProductToWishList.spec.ts
│   ├── AddToCart.spec.ts
│   ├── ChangePassword.spec.ts
│   ├── ForgotPassword.spec.ts
│   ├── LoginDataDriven.spec.ts
│   ├── LoginValidCredentials.spec.ts
│   ├── Logout.spec.ts
│   ├── Registration.spec.ts
│   ├── RemoveProductFromWishList.spec.ts
│   ├── Search.spec.ts
│   └── SubscribeToNewsletter.spec.ts
│
├── pages/                          # Page Object Model - Page classes
│   ├── CartItems.ts
│   ├── ChangePassword.ts
│   ├── ForgotPassword.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── LogoutConfirmationPage.ts
│   ├── MyAccountPage.ts
│   ├── MyWishList.ts
│   ├── NewsLetter.ts
│   ├── ProductPage.ts
│   ├── RegistrationConfirmationPage.ts
│   ├── RegistrationPage.ts
│   └── SearchResultsPage.ts
│
├── utils/                          # Utility functions
│   ├── dataProvider.ts            # Test data provisioning
│   ├── randomDataProvider.ts      # Random data generation
│   └── testDataStore.ts           # Test data storage
│
├── test-data/                      # Test data files
├── testdata/                       # Additional test data
├── allure-results/                 # Allure test results
├── allure-report/                  # Allure HTML reports
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/slobodanzivic/UI_Automation_Playwright.git
   cd UI_Automation_Playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Environment Setup

Run the setup batch file (Windows):
```bash
env_setup.bat
```

## 📋 Available Test Suites & Commands

### Run Tests by Category

```bash
# Master tests (All critical tests)
npm run test:master

# Sanity tests (Quick smoke tests)
npm run test:sanity

# Regression tests (Comprehensive test suite)
npm run test:regression
```

### Run Tests by Browser

```bash
# Chromium (Chrome)
npm run test:master:chromium

# All browsers (Chromium, Firefox, WebKit)
npm run test:master:allBrowsers

# Firefox
npm run test:firefox

# WebKit
npm run test:webkit

# Chrome & Firefox combined
npm run test:chrome-firefox
```

### Specialized Test Runs

```bash
# Chrome browser with custom test projects
npm run test:chrome

# Firefox browser with custom test projects
npm run test:firefox

# Flaky test detection (Run tests 5 times each)
npm run test:flaky
```

## 📊 Reporting & Results

### Allure Reporting

```bash
# Clean previous results
npm run test:clean

# Generate Allure report
npm run allure:report

# Serve Allure report locally
npm run allure:serve
```

The Allure report provides:
- Test execution timeline
- Pass/fail statistics
- Screenshots and videos on failure
- Test traces for debugging
- Detailed test history

### HTML Reports

Standard Playwright HTML reports are generated automatically after test execution in the `playwright-report/` directory.

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:

- **Timeout**: 60 seconds per test
- **Retries**: 1 retry on failure
- **Workers**: 3 parallel workers
- **Viewport**: 1280x720px (Desktop)
- **Screenshot**: Captured on failure only
- **Video**: Retained on failure
- **Trace**: Captured on first retry

### Browser Support

The project is configured to run tests on:
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

## 📌 Test Categories (Tagging)

Tests are organized using tags for selective execution:

- `@master` - Critical test cases
- `@sanity` - Quick smoke tests
- `@regression` - Full regression suite


## 🧪 Test Data Management

The project includes utilities for test data handling:

- **dataProvider.ts** - Structured test data provisioning
- **randomDataProvider.ts** - Generate random test data using Faker.js
- **testDataStore.ts** - Store and retrieve test data

## 🐛 Debugging

### Run Tests in Headed Mode

Edit `playwright.config.ts` to enable headed mode:
```typescript
use: {
  headless: false,  // Change to false
}
```

### Enable Slow Motion

```typescript
use: {
  slowMo: 1000,  // Delay in ms between actions
}
```

### Inspect Individual Tests

```bash
npx playwright test tests/LoginDataDriven.spec.ts --debug
```

## 📝 Test Execution Results

Results are stored in:
- `allure-results/` - Allure test results (JSON format)
- `test-results/` - Test execution artifacts
- `testresults.json` - Summary results

## 🔨 Npm Scripts Reference

| Command | Purpose |
|---------|---------|
| `test:master` | Run all master tests |
| `test:sanity` | Run sanity tests |
| `test:regression` | Run regression tests |
| `test:master:allBrowsers` | Run master tests on all browsers |
| `test:clean` | Clean Allure results |
| `allure:report` | Generate Allure report |
| `allure:serve` | Serve Allure report |
| `test:flaky` | Detect flaky tests (5 runs each) |

## 📚 Best Practices

1. **Use Page Object Model** - Encapsulate page interactions in page classes
2. **Organize Tests** - Group related tests using describe blocks
3. **Data-Driven Testing** - Use test data providers for parametrized tests
4. **Meaningful Assertions** - Write clear and specific assertions
5. **Tag Tests** - Use @master, @sanity, @regression tags appropriately
6. **Screenshot/Video** - Review failures with captured media
7. **Parallel Execution** - Leverage parallel workers for faster execution

## 🚨 Troubleshooting

### Tests Failing to Run

```bash
# Reinstall Playwright
npm install
npx playwright install
```

### Port Already in Use

Change the port in your test configuration or kill the process using PORT:

```bash
# Windows
netstat -ano | findstr :PORT
taskkill /PID <PID> /F
```

### Missing Dependencies

```bash
npm install --save-dev @playwright/test
npm install @faker-js/faker csv-parse xlsx
```

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Faker.js Documentation](https://fakerjs.dev/)

## 📄 License

ISC

## 👥 Contributing

Follow these guidelines:
1. Use descriptive test names
2. Follow the Page Object Model pattern
3. Add appropriate test tags (@master, @sanity, @regression)
4. Include test data in dedicated utilities
5. Update this README if adding new features

---

**Last Updated**: March 2026
**Project Version**: 1.0.0
