// Generated from: src\tests\featureFiles\SmokeTests.feature
import { test } from "playwright-bdd";

test.describe('Cassandra Smoke Test', () => {

  test('Verify user is able to access all modules of cassandra Application and pages are loading Successfully', { tag: ['@SmokeTest'] }, async ({ Given, page, When, Then, And }) => { 
    await Given('User Launched Cassandra Application', null, { page }); 
    await When('User verifies Application launched Successfully', null, { page }); 
    await Then('User Opens "Dashboard" Tab', null, { page }); 
    await And('User should be able to see the "Counterparties Summary" details', null, { page }); 
    await When('User should be able to see the ""  of "Static Data" and verified the page response', null, { page }); 
    await When('User should be able to see the ""  of "Reporting" and verified the page response', null, { page }); 
    await When('User should be able to see the ""  of "Workflow" and verified the page response', null, { page }); 
    await When('User should be able to see the ""  of "Exposure" and verified the page response', null, { page }); 
    await When('User should be able to see the ""  of "Insurance" and verified the page response', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('src\\tests\\featureFiles\\SmokeTests.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":["@SmokeTest"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given User Launched Cassandra Application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When User verifies Application launched Successfully","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then User Opens \"Dashboard\" Tab","stepMatchArguments":[{"group":{"start":11,"value":"\"Dashboard\"","children":[{"start":12,"value":"Dashboard","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And User should be able to see the \"Counterparties Summary\" details","stepMatchArguments":[{"group":{"start":31,"value":"\"Counterparties Summary\"","children":[{"start":32,"value":"Counterparties Summary","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When User should be able to see the \"\"  of \"Static Data\" and verified the page response","stepMatchArguments":[{"group":{"start":31,"value":"\"\"","children":[{"start":32,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":38,"value":"\"Static Data\"","children":[{"start":39,"value":"Static Data","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When User should be able to see the \"\"  of \"Reporting\" and verified the page response","stepMatchArguments":[{"group":{"start":31,"value":"\"\"","children":[{"start":32,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":38,"value":"\"Reporting\"","children":[{"start":39,"value":"Reporting","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When User should be able to see the \"\"  of \"Workflow\" and verified the page response","stepMatchArguments":[{"group":{"start":31,"value":"\"\"","children":[{"start":32,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":38,"value":"\"Workflow\"","children":[{"start":39,"value":"Workflow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When User should be able to see the \"\"  of \"Exposure\" and verified the page response","stepMatchArguments":[{"group":{"start":31,"value":"\"\"","children":[{"start":32,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":38,"value":"\"Exposure\"","children":[{"start":39,"value":"Exposure","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When User should be able to see the \"\"  of \"Insurance\" and verified the page response","stepMatchArguments":[{"group":{"start":31,"value":"\"\"","children":[{"start":32,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":38,"value":"\"Insurance\"","children":[{"start":39,"value":"Insurance","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end