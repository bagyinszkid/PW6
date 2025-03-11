Hello!

This is version2 of Task1 in the Playwright Automation School

## 1. POM, fixtures, test files

In the current version of my solution for Task1: 

The 'env' folder: contains the environment files for QA and PROD 
The 'pages' folder: contains the Page Object Models
The 'tests' folder: contains both the tests themselves and the fixture file 
The 'screenshots' folder: collects the screenshots created during testing


## 3. Running the tests
I've used these options to run my tests:

setting the environment variable: $env:ENV="prod"
running the test: npx playwright test -g "E2E"