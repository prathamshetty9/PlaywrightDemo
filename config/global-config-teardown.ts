const cp = require("child_process");
import * as fs from "fs";
import * as path from "path";
const os = require("os");

async function globalConfigTeardown() {
  await generateTestCasesCSVFile("./resources", "testCases.csv");
//   await tdmTeardown();
}

/**
 * Generates a CSV file in the given path which will contain a list of all the test cases implemented in this framework
 * @param filePath
 * @param fileName
 */
async function generateTestCasesCSVFile(filePath: string, fileName: string) {
  // Check if the 'resources' directory exists, if not create it
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  fs.writeFileSync(path.join(filePath, fileName), "Product,Scenario");

  const configFileNames = fs.readdirSync("config/");  // Cross-platform directory listing
  const playwrightFileNames = filterPlaywrightFileNames(configFileNames.toString());

//   ignoreConfigs.forEach((configFile) => {
//     let index = playwrightFileNames.indexOf(configFile);
//     if (index !== -1) {
//       playwrightFileNames.splice(index, 1);
//     }
//   });

  for (const configFile of playwrightFileNames) {
    const testCaseList = await cp.execSync(
      `npx playwright test --config=config/${configFile} --project=chromium --list`
    );
    const projectName = extractProjectName(configFile);
    let testCasesSet = new Set(extractTestNames(testCaseList.toString()));

    testCasesSet.forEach((testCaseName) => {
      if (testCaseName != null) {
        fs.appendFileSync(
          path.join(filePath, fileName),
          `\n${projectName},${testCaseName}`
        );
      }
    });
  }
}

/**
 * To filter the list to contain only file names which start with 'playwright'
 * @param inputString
 * @returns list of config file names
 */
function filterPlaywrightFileNames(inputString: string): string[] {
  const fileNamesArray = inputString.split("\n");
  const playwrightFileNames = fileNamesArray.filter((fileName) =>
    fileName.startsWith("playwright")
  );
  return playwrightFileNames;
}

/**
 * To get Project name using config file name
 * @param configFileName
 * @returns Project name
 */
function extractProjectName(configFileName: string): string | null {
  const regex = /playwright\.(.*?)\.config\.ts/;
  const matches = configFileName.match(regex);
  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return null;
  }
}

/**
 * To get test case names along with test file path
 * @param input
 * @returns test case name with test case file path
 */
function extractTestNames(input: string): string[] {
  const regex = /› (.*?) @/g;
  const matches: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const testCaseName = extractTestCaseName(match[1].trim());
    matches.push(testCaseName);
  }
  return matches;
}

/**
 * To get test case name
 */
function extractTestCaseName(inputString: string) {
  const regex = /›\s(.*?)$/;
  const match = regex.exec(inputString);
  if (match && match[1]) {
    return match[1].trim();
  }
  return "";
}

export default globalConfigTeardown;