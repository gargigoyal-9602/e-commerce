Feature: filteritems

    Scenario: User navigates to filteritems
        Given I am a User loading filteritems
        When I navigate to the filteritems
        Then filteritems will load with out errors
        And filteritems will load products without errors
        And filteritems will filter data without errors
        And filteritems will add to wishlist without errors
        And filteritems will remove from wishlist without errors
        And filteritems will get products with id without errors
        And filteritems will add to cart without errors
        And filteritems will get cart list without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to filteroptions
        Given I am a User loading filteroptions
        When I navigate to the filteroptions
        Then filteroptions will load with out errors
        And filteroptions will get category without errors
        And filteroptions will get brand without errors
        And filteroptions will apply all without errors
        And filteroptions will get tags without errors
        And I can select the button with with out errors
        And I can leave the screen with out errors