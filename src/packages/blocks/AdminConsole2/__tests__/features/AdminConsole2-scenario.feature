Feature: AdminConsole2

    Scenario: User navigates to AdminConsole2
        Given I am a User loading AdminConsole2
        When I navigate to the AdminConsole2
        Then AdminConsole2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors