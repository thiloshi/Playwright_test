Module
IT3040 - IT Project Management(Semester 1)

Project Description - This repository contains the complete playwright automated testing project developed for SwiftTranslator web application
*Automated UI testing using Playwright
*Functional testing for positive and negative test cases
*input Validation and UI stability testing
*proper use of Git version control and test automation best practical

Technologies Used
*Playwright
*Node.js
*javaScript
*Git& GitHub

**Installation** 
cd Playwright
npm install
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
npm init playwright@latest
npx playwright test --headed 
npx playwright test --project=webkit --headed
npx playwright show-report

Positive Test cases
valid singlish
supported translations
UI stability for valid inputs

Negative test cases
Invalid characters
English-Only inputs
URLs
Numbers-only inputs

UI tests
Trxtarea input validation
Typing behavior
output container visibility
