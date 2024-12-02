import { chromium } from 'playwright';
import test from "../../pages/lamda-test/lamdaBasePage";

test('Measure page load performance', async ({ page }) => {
    const startTime = performance.now();
    await page.goto('https://ecommerce-playground.lambdatest.io/', { waitUntil: 'load' });
    const endTime = performance.now();

    console.log(`Page load time: ${endTime - startTime}ms`);
});


test('Retrieve browser metrics', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    const metrics = await page.evaluate(() => JSON.stringify(window.performance));
    console.log(`Metrics: ${metrics}`);
});
