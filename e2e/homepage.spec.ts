import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/en')
    
    await expect(page).toHaveTitle(/BioNXA/)
    await expect(page.locator('text=BioNXA')).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/en')
    
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Start Learning')).toBeVisible()
  })

  test('should navigate to auth page', async ({ page }) => {
    await page.goto('/en')
    
    await page.click('text=Sign In')
    await expect(page).toHaveURL(/.*auth/)
  })
})
