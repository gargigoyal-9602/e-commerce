Feature: ordersummary

    Scenario: User navigates to ordersummary
        Given I am a User loading ordersummary
        When I navigate to the ordersummary
        Then ordersummary will load with out errors
        And ordersummary init values without errors
        And ordersummary will load cart list without errors
        And ordersummary failed to load cart list
        And ordersummary will load user profile without errors
        And ordersummary failed to load user profile
        And ordersummary will load cart product id without errors
        And ordersummary failed to load cart product id
        And ordersummary will load place order without errors
        And ordersummary failed to place order
        And ordersummary will create stripe payment id without errors
        And ordersummary failed to create stripe payment id
        And ordersummary will load with mocked data
        And I can enter text with out errors
        And I can select the button with with out errors
        And Show guest modal without errors
        And I can leave the screen with out errors