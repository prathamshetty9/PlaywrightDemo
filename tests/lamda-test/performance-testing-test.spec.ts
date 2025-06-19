import { chromium } from 'playwright';
import test from "../../pages/lamda-test/lamdaBasePage";


test('Measure page load performance @LAMDA', async ({ page, loginPage ,homePage }) => {
    const startTime = performance.now();
    await page.goto('https://ecommerce-playground.lambdatest.io/', { waitUntil: 'load' });
    const endTime = performance.now();

    console.log(`Page load time: ${endTime - startTime}ms`);
});


// Validate against a threshold
test('Measure and validate performance using Performance Timing API @LAMDA', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/', { waitUntil: 'load' });

    const timing = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance.timing)));

    const pageLoadTime = timing.loadEventEnd - timing.navigationStart; // Time from navigation start to load
    console.log(`Page Load Time: ${pageLoadTime}ms`);

    const threshold = 10000; // 10 seconds
    if (pageLoadTime > threshold) {
        throw new Error(`Page load time exceeded ${threshold}ms. Actual time: ${pageLoadTime}ms`);
    }
});

