


Hello!

This is the intended solution for the first Task in the Playwright Automation School

A couple of notes about the work:


## 1. Old files

I've left two artefacts from my first approach in the repo, showing how I started. 

The 'env' folder contains the "environment variables" as I thought would be logical to handle the differences 
between languages at first The test file 'task1.spec.ts' contains the test code I was working on with the first approach, 
without clean-up


## 2. POM, fixtures, test files

In the current version of my solution for Task1: 

The 'pages' folder: contains the Page Object Models, where I've tried to move out any re-usable, 
parameterizable or otherwise shared steps as functions. 

The 'tests' folder: contains both the tests themselves tagged to support 'qa' and 'prod' environments, and the fixture file 

The 'screenshots' folder: collects the screenshots created during testing


## 3. Running the tests

For running the tests on "different environments from the terminal" I've used two features from Playwright test runner, 
setting up different baseURLs in config (project) and tagging different versions of the same tests (-g) to support 
the language differences. 

I've used these options to run my tests:

For QA : npx playwright test -g '@qa' --project 'qa-firefox' --project 'qa-safari'
For PROD : npx playwright test -g '@prod' --project 'prod-firefox' --project 'prod-safari'

