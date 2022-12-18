const { test, expect } = require("@playwright/test");

test("Main page has the expected title and headings", async ({ page }) => {
   await page.goto('/');
   await expect(page).toHaveTitle('Shared shopping lists');
   await expect(page.locator('h1')).toHaveText('Shared shopping lists');
   await expect(page.locator('h2')).toHaveText(['Add a list', 'Active lists']);
});

test('Can create a list', async ({ page }) => {
    await page.goto('/');
    const listName = `My list: ${Math.random()}`;
    await page.locator('input[type=text]').type(listName);
    await page.locator('input[type=submit]').click();
    await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
})

test('Can open a list page', async ({ page }) => {
    await page.goto('/');
    const listName = `My list: ${Math.random()}`;
    await page.locator('input[type=text]').type(listName);
    await page.locator('input[type=submit]').click();
    await page.locator(`a >> text='${listName}'`).click();
    await expect(page.locator('h1')).toHaveText(listName);
})

test('Can create a list item', async ({ page }) => {
    await page.goto('/');
    const listName = `My list: ${Math.random()}`;
    await page.locator('input[type=text]').type(listName);
    await page.locator('input[type=submit]').click();
    await page.locator(`a >> text='${listName}'`).click();
    const itemName = `My item: ${Math.random()}`;
    await page.locator('input[type=text]').type(itemName);
    await page.locator('input[type=submit').click();
    await expect(page.locator(`a >> text='${itemName}'`)).toHaveText(itemName);
})

test('Can deactivate lists', async ({ page }) => {
    await page.goto('/');
    await page.goto('/');
    const listName = `My list: ${Math.random()}`;
    await page.locator('input[type=text]').type(listName);
    await page.locator('input[type=submit]').click();
    await page.locator('button >> nth=1').click();
    await expect(page.locator(`a >> text='${listName}'`)).toHaveCount(0);
})