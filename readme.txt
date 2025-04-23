Hello!

This is version4 of the Playwright Automation School 

## 1. POM, fixtures, test files

In the current version of my solution for Task1: 

The 'env' folder: contains the environment files for QA and PROD 
The 'pages' folder: contains the Page Object Models
The 'tests' folder: contains both the tests themselves and the fixture file 
The 'screenshots' folder: collects the screenshots created during testing

for Task2: 

The 'test-data' folder: contains the payload csv for API


## 3. Running the tests

setting the environment variable: $env:ENV="prod" or $env:"qa"
running the test: 
for PROD : npx playwright test -g "E2E" --project chrome
for QA : npx playwright test -g "E2E"

running the API test: 
npx playwright test --project API