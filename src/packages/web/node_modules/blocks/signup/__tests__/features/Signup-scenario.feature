Feature: Signup

    Scenario: User navigates to Signup
        Given I am a User loading Signup
        When I navigate to the Signup
        Then Signup will load with out errors
        And I can leave the screen with out errors