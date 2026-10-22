import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('routes, theme preference, and migration lab', async ({page,context}) => {
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Existing software/})).toBeVisible();
  await page.getByRole('link',{name:'Services',exact:true}).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await page.locator('.site-header [aria-label^="Theme:"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.goto('/lab');
  await page.getByLabel('Source language').selectOption('Java');
  await page.getByLabel('Workload').selectOption('CLI utility');
  await expect(page.getByText('Sum integer arguments')).toBeVisible();
  await page.getByRole('button',{name:'Unified diff'}).click();
  await expect(page.getByLabel('Unified textual diff')).toBeVisible();
  await page.getByRole('button',{name:'Side by side'}).click();
  await page.getByRole('button',{name:'Copy main.rs code'}).click();
  await expect(page.getByRole('button',{name:'Copy main.rs code'})).toContainText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('fn main()');
});
test('mobile dock, form validation, and layout width', async ({page}) => {
  await page.setViewportSize({width:375,height:812});
  await page.goto('/');
  await expect(page.getByRole('navigation',{name:'Mobile primary navigation'})).toBeVisible();
  await page.getByRole('navigation',{name:'Mobile primary navigation'}).getByRole('link',{name:'Migration Lab'}).click();
  await expect(page).toHaveURL(/\/lab$/);
  await page.getByRole('button',{name:'Open menu'}).click();
  await page.getByRole('navigation',{name:'Mobile secondary navigation'}).getByRole('link',{name:'About'}).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.getByRole('link',{name:'Start a project',exact:true}).last().click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.getByRole('button',{name:/Open email draft/}).click();
  await expect(page.getByText('This field is required.').first()).toBeVisible();
  await page.getByLabel('Your name *').focus();
  await expect(page.getByRole('navigation',{name:'Mobile primary navigation'})).toHaveCSS('opacity','0');
  for (const route of ['/','/services','/work','/lab','/about','/contact']) { await page.goto(route); const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1); expect(overflow,`${route} overflows`).toBe(false); }
});
test('home and contact have no serious accessibility violations', async ({page}) => {
  for (const theme of ['light','dark']) for (const route of ['/','/contact']) { await page.goto(route); await page.evaluate(mode => {localStorage.setItem('neon-theme',mode); document.documentElement.dataset.theme=mode;},theme); await page.waitForTimeout(350); const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze(); expect(result.violations.filter(v=>['critical','serious'].includes(v.impact||'')),`${route} ${theme} accessibility`).toEqual([]); }
});
