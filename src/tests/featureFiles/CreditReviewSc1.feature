Feature: Cassandra Smoke Test
    This feature File depicts the validation of all pages in Cassandara Application
    Feature Description

  @CreditReview
  Scenario: Verify user is able to access all modules of cassandra Application and pages are loading Successfully
    Given User Launched Cassandra Application
    When User verifies Application launched Successfully
    Then User Opens "Dashboard" Tab
    And User should be able to see the "Counterparties Summary" details
    When User searched for "parent" CounterParty "EGPC" and opened
    When User Opened 'CREDIT REVIEWS' Tab and Verified "counterparty-credit-reviews" page is Opened Successfully
    #When  When User Opened 'Overview' Tab of Credit review page and  Verified "counterparty-credit-reviews" page is Opened Successfully
   # When User created a new Credit Review record for the 'EGPC' Counterparty with details from 'CP_OverView_Data_EGPC'

  @CreditReview
  Scenario: Verify user is able to access all tabs in counterparty page
    Given User Launched Cassandra Application
    When User verifies Application launched Successfully
    Then User Opens "Dashboard" Tab
    And User should be able to see the "Counterparties Summary" details
    When User searched for "parent" CounterParty "EGPC" and opened
    When User Opened 'EXPOSURE' Tab and Verified "EXPOSURE" page is Opened Successfully
    When User Opened 'Overview' Tab and Verified "counterparties" page is Opened Successfully 
    When User Opened 'TNC & CSA' Tab and Verified "netting-contract" page is Opened Successfully
    When User Opened 'PCG' Tab and Verified "pcg" page is Opened Successfully
    When User Opened 'Insurance' Tab and Verified "counterparty-insurance" page is Opened Successfully
