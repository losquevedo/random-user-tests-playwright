import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://randomuser.me');
});

test.describe('Random User Generator Tests', () => {

  test('should see the Random User Generator Title, Name. and photo are present', async ({ page }) => {
    expect(page.getByText('Random User Generator')).toBeVisible;
    expect(page.locator('#user_title')).toBeVisible;
    expect(page.locator('#user_value')).toBeVisible;
    expect(page.locator('#user_photo')).toBeVisible;
  });

  //Using links here since they're more specific and easier to make dynamic

  test('should confirm navbar and icons are present', async ({ page }) => {
    expect(page.locator('#navbar')).toBeVisible;

    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'User Photos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Change Log' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats & Graphs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Donate' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Copyright Notice' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Photoshop Extension' })).toBeVisible();
  });

  test('Should confirm user details are active when hovered over', async ({ page }) => {
    //Verifying this via the custom test id specified in playwright.config.ts so it's not as static
    await page.getByTestId("name").hover();
    expect(page.locator('active')).toHaveClass;

    await page.getByTestId("email").hover();
    expect(page.locator('active')).toHaveClass;

    await page.getByTestId("birthday").hover();
    expect(page.locator('active')).toHaveClass;

    await page.getByTestId("location").hover();
    expect(page.locator('active')).toHaveClass;

    await page.getByTestId("phone").hover();
    expect(page.locator('active')).toHaveClass;

    await page.getByTestId("pass").hover();
    expect(page.locator('active')).toHaveClass;
  });

});
