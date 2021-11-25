Feature: Auth

    Scenario: User navigates to Auth
        Given I am a User loading Auth
        When I navigate to the Auth
        Then Auth will load with out errors
        And I can toggle between login and signup
        And I can leave the screen with out errors

    Scenario: User navigates to Auth from cart
        Given I am a User loading Auth
        When I navigate to the Auth
        Then Auth will load with out errors
        And I can toggle between login and signup
        And I can leave the screen with out errors

    Scenario: User navigates to Auth and press backbutton
        Given I am a User loading Auth
        When I navigate to the Auth and press backbutton
        Then The App will exit