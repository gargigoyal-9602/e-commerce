Feature: shoppingcart

    Scenario: User navigates to shoppingcart
        Given I am a User loading shoppingcart
        When I navigate to the shoppingcart
        Then shoppingcart will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to checkout
        Given I am a User loading checkout
        When I navigate to the checkout
        Then checkout will load with out errors
        And I can leave the screen with out errors
    
    Scenario: User navigates to editaddress
        Given I am a User loading editaddress
        When I navigate to the editaddress
        Then editaddress will load with out errors
        And I can leave the screen with out errors