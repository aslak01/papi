import { expect, test } from "@playwright/test"

const tests = [
  {
    title: "has home in title",
    url: "/",
    predicate: (t) => t.toHaveTitle(/api browser/i)
  },

]

tests.forEach(tst => {
  const { title, url, predicate } = tst
  test(`${title}`, async ({ page }) => {
    await page.goto(url)
    await predicate(expect(page))
  })
})


