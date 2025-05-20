import { test, expect } from '@playwright/test'
import AxeBuilder from "@axe-core/playwright"


test('Homepage a11y', async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze()
  console.log({ results })
  expect(results.violations).toEqual([])
})

