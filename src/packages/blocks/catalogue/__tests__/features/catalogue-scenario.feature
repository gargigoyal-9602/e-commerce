Feature: Catalogue

    Scenario: User navigates to Catalogue
        Given I am a User loading Catalogue
        When I navigate to the Catalogue
        Then Catalogue will load with out errors
        Then Catalogue will pre-load data without errors
        Then Catalogue load products data without errors
        Then Catalogue load recommended data without errors
        Then Catalogue load categories data without errors
        Then Catalogue load cart product data without errors
        Then Catalogue load cart list data without errors
        Then Catalogue add to wishlist without errors
        Then Catalogue remove from wishlist without errors
        Then Catalogue add to cart without errors
        Then Catalogue send device token without errors
        Then Catalogue notification without errors
        Then Catalogue button actions without errors
        And I can leave the screen with out errors