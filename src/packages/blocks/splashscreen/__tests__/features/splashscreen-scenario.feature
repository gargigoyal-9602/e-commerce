Feature: splashscreen

    Scenario: User navigates to splashscreen
        Given I am a User loading splashscreen
        When I navigate to the splashscreen
        Then splashscreen will load with out errors
        And I can leave the screen with out errors