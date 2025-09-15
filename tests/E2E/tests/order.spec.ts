import { test } from '@playwright/test';
import PageSpecs from '../class/PageSpec';

test.describe('Order Creation Flow', () => {
    test('should create order and log Order ID', async ({ page }) => {
        const orderPage = new PageSpecs(page);

        await orderPage.goto('/');

        await orderPage.fill('input[name="customer_name"]', 'Lam Hoang');
        await orderPage.fill('input[name="customer_email"]', 'lamhoang7146@gmail.com');

        await orderPage.fill('#bring-domain-input', 'lamhoang.com');
        await orderPage.click('#bring-domain-add-btn');

        const buyDomainsSection = await orderPage.locator(
            `:is(#buy-domains-section, #section-domains-buy, #domains-buy-container, #buy-section-domains, #container-buy-domains, #domains-to-buy-section, #buy-domains-area, #section-buy-domain-list)`,
        );

        await buyDomainsSection.locator('input[type="text"]').fill('danang.com');
        await buyDomainsSection.locator('button[type="button"]').click();

        await orderPage.click('#order-submit-btn');
        const response = await orderPage.waitForResponse('/order');
        if (response?.props?.errors) {
            console.error('Order creation failed with errors: ', response.props.errors);
        }
        console.log('Order created with ID:', response.props?.order_id);
    });
});
