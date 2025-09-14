import { Page, expect } from '@playwright/test';
import { PageSpecsInterface } from '../interfaces/PageSpec.interface';

export default class PageSpecs implements PageSpecsInterface {
    constructor(private page: Page) {}

    async goto(url: string) {
        await this.page.goto(url);
    }

    async fill(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    async click(selector: string) {
        const locator = this.page.locator(selector);
        await expect(locator).toBeVisible();
        await expect(locator).toBeEnabled();
        await locator.click();
    }

    async waitForResponse(url: string) {
        try {
            const response = await this.page.waitForResponse((res) => res.url().includes(url) && res.status() === 200);
            return await response.json();
        } catch (error) {
            console.error('Error waiting for response:', error);
            throw error;
        }
    }
}
