Feature: payments

    Scenario: User navigates to payments
        Given I am a User loading payments
        When I navigate to the payments
        Then payments will load with out errors
        And I can enter text with out errors
        And I can leave the screen with out errors

    Scenario: User trying to make payment
        Given I am a User loading payments
        When I click on pay with razor pay
        Then Payment should success

    Scenario: User navigates to Hyperpay
        Given I am a User loading Hyperpay
        When I navigate to the Hyperpay
        Then Hyperpay will load with out errors
        And I can enter text with out errors
        And I can select the submit button with with out errors
        And I can leave the screen with out errors