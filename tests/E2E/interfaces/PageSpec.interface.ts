import { Locator, Response } from '@playwright/test';

export interface PageSpecsInterface {
    goto(url: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;

    locator(selector: string): Promise<Locator>;

    click(selector: string): Promise<void>;
    waitForResponse(url: string): Promise<Response>;
}
