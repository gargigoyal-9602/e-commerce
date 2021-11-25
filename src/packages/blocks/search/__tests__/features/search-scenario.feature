Feature: search

    Scenario: User navigates to search
        Given I am a User loading search
        When I navigate to the search
        Then search will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors