import { Response } from '@playwright/test';

export interface PageSpecsInterface {
    goto(url: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    click(selector: string): Promise<void>;
    waitForResponse(url: string): Promise<Response>;
}
