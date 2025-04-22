Hello!

This is version3 of Task1 in the Playwright Automation School

## 1. POM, fixtures, test files

In the current version of my solution for Task1: 

The 'env' folder: contains the environment files for QA and PROD 
The 'pages' folder: contains the Page Object Models
The 'tests' folder: contains both the tests themselves and the fixture file 
The 'screenshots' folder: collects the screenshots created during testing


## 3. Running the tests

setting the environment variable: $env:ENV="prod" or $env:"qa"
running the test: 
for PROD : npx playwright test -g "E2E" --project chrome
for QA : npx playwright test -g "E2E"