const fs = require('fs');
const path = require('path');

// Read Playwright results JSON
const resultsFilePath = path.resolve('playwright-report/json-report.json');
const results = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));

// Initialize counters
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

// Calculate the number of passed, failed, and skipped tests
results.suites.forEach(suite => {
    suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
            test.results.forEach(result => {
                if (result.status === 'passed') {
                    passedTests++;
                } else if (result.status === 'failed') {
                    failedTests++;
                } else if (result.status === 'skipped') {
                    skippedTests++;
                }
            });
        });
    });
});


// Generate HTML content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Playwright Test Results</title>
</head>
<body>
    <h2>Playwright Test Results</h2>
    <p>Build Status: ${process.env.BUILD_STATUS || 'Unknown'}</p>
    <p>Build Number: ${process.env.BUILD_NUMBER || 'Unknown'}</p>
    <p>Project Name: ${process.env.PROJECT_NAME || 'Unknown'}</p>
    <p>Console Output: <a href="${process.env.BUILD_URL || '#'}console">View Console Output</a></p>
    <p>Playwright HTML Report: <a href="${process.env.BUILD_URL || '#'}artifact/playwright-report/index.html">View Report</a></p>

    <h3>Test Results Summary</h3>
    <table border="1">
        <tr>
            <th>Test Result</th>
            <th>Number of Tests</th>
        </tr>
        <tr>
            <td>Passed</td>
            <td>${passedTests}</td>
        </tr>
        <tr>
            <td>Failed</td>
            <td>${failedTests}</td>
        </tr>
        <tr>
            <td>Skipped</td>
            <td>${skippedTests}</td>
        </tr>
    </table>
</body>
</html>
`;

// Save HTML file
fs.writeFileSync('playwright-report/playwright-report-summary.html', htmlContent);
console.log('HTML report generated: playwright-report-summary.html');
