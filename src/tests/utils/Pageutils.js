import { test } from '@playwright/test';  // Import test globally
import { expect } from '@playwright/test';
import { mkdirSync } from 'fs';
import { join } from 'path';

class PageUtils {
  constructor(page) {
    this.page = page;
  }
  
  async fill(locator, text) {
    test.info(`Filling text: "${text}"`);
    await locator.fill(text);
  }

  async click(locator, message = 'Clicking on element') {
    test.info(`Clicking on: ${message}`);
    await locator.click();
  }

  async expectVisible(locator, message = 'Element should be visible') {
    await expect(locator, message).toBeVisible();
  }

  async hoverOnElement(locator, message = 'Hovering on element') {
    await test.step(message, async () => {
      await locator.hover();
      await expect(locator).toBeVisible();
    });
  }

  async getText(locator) {
    return await locator.textContent();
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async pressKey(locator, key) {
    await locator.waitForSelector({ state: 'visible' });
    await locator.press(key);
  }

  async isElementClickable(locator) {
    const isVisible = await locator.isVisible();
    const isEnabled = await locator.isEnabled();

    if (!isVisible || !isEnabled) {
      console.log(' Element is not clickable: Either not visible or not enabled');
      return false;
    }

    try {
      await locator.click({ trial: true });
      return true;
    } catch (e) {
      console.error('Element is not clickable (trial click failed):', e.message);
      return false;
    }

  }

  async assertElementIsClickable(locator, message = 'Element should be clickable') {
    const clickable = await this.isElementClickable(locator);
    expect(clickable, message).toBe(true);
  }

  async takeScreenshot(name = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${name}-${timestamp}.png`;
    const screenshotPath = join('screenshots', fileName);

    mkdirSync('screenshots', { recursive: true });

    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    if (typeof test !== 'undefined' && test.info) {
      await test.info().attach(`Screenshot: ${name}`, {
        body: await this.page.screenshot(),
        contentType: 'image/png',
      });
    }

    console.log(`Screenshot saved: ${screenshotPath}`);
  }

  //Utility to handle dropdown options in case of select calss object
  async selectDropdownOptions(dropDownlocator, type, option) {

    switch (type) {
      case 'value':
        await dropDownlocator.selectOption(option)
        break;
      case 'label':
        await dropDownlocator.selectOption({ label: option })
        break;
      case 'index':
        await dropDownlocator.selectOption({ index: option })
        break;
      default:
        throw new Error('Invalid option type. Use "label", "value", or "index".')

    }
  }

}

export default PageUtils;
