import { test, expect } from '@playwright/test';

test('should redirect to login when not authenticated', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.*login/);
});

test('should show the landing page title', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h1')).toContainText(/Career Track/i);
});
