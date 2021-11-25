Feature: Login

    Scenario: User navigates to Login
        Given I am a User loading Login
        When I navigate to the Login
        Then Login will load with out errors
        And I can leave the screen with out errors