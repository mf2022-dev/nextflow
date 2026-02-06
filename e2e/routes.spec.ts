import { test, expect } from '@playwright/test'

const routes = [
  { path: '/en', title: 'BioNXA' },
  { path: '/ar', title: 'BioNXA' },
  { path: '/en/privacy', title: 'Privacy' },
  { path: '/ar/privacy', title: 'الخصوصية' },
  { path: '/en/terms', title: 'Terms' },
  { path: '/ar/terms', title: 'الشروط' },
  { path: '/en/pricing', title: 'Pricing' },
  { path: '/ar/pricing', title: 'الأسعار' },
  { path: '/en/auth', title: 'Sign' },
  { path: '/ar/auth', title: 'تسجيل' },
]

test.describe('All Routes', () => {
  for (const route of routes) {
    test(`${route.path} should load successfully`, async ({ page }) => {
      const response = await page.goto(route.path)
      
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(new RegExp(route.title, 'i'))
    })
  }
})
