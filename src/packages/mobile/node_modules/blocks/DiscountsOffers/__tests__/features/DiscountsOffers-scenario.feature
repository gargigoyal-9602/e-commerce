Feature: DiscountsOffers

    Scenario: User navigates to DiscountsOffers
        Given I am a User loading DiscountsOffers
        When I navigate to the DiscountsOffers
        Then DiscountsOffers will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors