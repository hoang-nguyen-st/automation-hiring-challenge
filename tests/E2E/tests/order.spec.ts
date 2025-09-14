import { test } from '@playwright/test';
import PageSpecs from '../class/PageSpec';

test.describe('Order Creation Flow', () => {
    test('should create order and log Order ID', async ({ page }) => {
        const orderPage = new PageSpecs(page);

        await orderPage.goto('/');

        await orderPage.fill('#name', 'Lam Hoang 123');
        await orderPage.fill('#email', 'lamhoang7146123@gmail.com');

        await orderPage.fill('#bring-domain-input', 'lamhoang123123.com');
        await orderPage.click('#bring-domain-add-btn');

        await orderPage.fill('#buy-domain-input', 'lamhoang7146123.com');
        await orderPage.click('#buy-domain-add-btn');

        await orderPage.click('#order-submit-btn');
        const response = await orderPage.waitForResponse('/order');
        console.log('Order created with ID:', response.props?.order_id);
    });
});
