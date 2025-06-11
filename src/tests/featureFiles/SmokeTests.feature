Feature: Cassandra Smoke Test
    This feature File depicts the validation of all pages in Cassandara Application
    Feature Description

  @SmokeTest
  Scenario: Verify user is able to access all modules of cassandra Application and pages are loading Successfully
    Given User Launched Cassandra Application
    When User verifies Application launched Successfully
    Then User Opens "Dashboard" Tab
    And User should be able to see the "Counterparties Summary" details
    When User should be able to see the ""  of "Static Data" and verified the page response
    When User should be able to see the ""  of "Reporting" and verified the page response
    When User should be able to see the ""  of "Workflow" and verified the page response
    When User should be able to see the ""  of "Exposure" and verified the page response
    When User should be able to see the ""  of "Insurance" and verified the page response


