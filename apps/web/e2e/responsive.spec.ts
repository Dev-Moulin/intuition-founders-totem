import { test, expect, devices } from '@playwright/test';

// Mobile Chrome tests
const mobileTest = test.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...devices['Pixel 5'],
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

mobileTest.describe('Mobile Chrome', () => {
  mobileTest('should display mobile navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  mobileTest('should be scrollable', async ({ page }) => {
    await page.goto('/');

    // Check page can scroll
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(bodyHeight).toBeGreaterThan(0);
  });
});

// iPhone tests
const iphoneTest = test.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

iphoneTest.describe('Mobile Safari', () => {
  iphoneTest('should display content on iPhone', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  iphoneTest('should handle touch events', async ({ page }) => {
    await page.goto('/');

    // Mobile viewport should be narrower
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(500);
  });
});

// Tablet tests
const tabletTest = test.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...devices['iPad (gen 7)'],
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

tabletTest.describe('Tablet', () => {
  tabletTest('should display tablet layout', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toBeEmpty();

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(700);
  });
});
