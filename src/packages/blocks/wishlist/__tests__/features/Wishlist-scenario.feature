Feature: Wishlist

    Scenario: User navigates to Wishlist
        Given I am a User loading Wishlist
        When I navigate to the Wishlist
        Then Wishlist will load with out errors
        And I can leave the screen with out errors