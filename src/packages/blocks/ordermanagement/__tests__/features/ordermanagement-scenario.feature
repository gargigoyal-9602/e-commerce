Feature: ordermanagement

    Scenario: User navigates to ordermanagement
        Given I am a User loading ordermanagement
        When I navigate to the ordermanagement
        Then ordermangement will mount and preload data
        Then ordermangement will load order list without errors
        Then ordermanagement will load with out errors
        And ordermangement failed to load order list
        And ordermanagement will render empty address view
        And ordermanagement will render order cell
        And I can leave the screen with out errors

    Scenario: User cancel an order
        Given I am a User attempting to cancel an order
        When I click on cancel order
        Then I click on yes
        And Rest Api will return success response
        And ordermangement failed to cancel order

    Scenario: User submit order review
        Given I am a User attempting to submit order review
        When Show submit review modal
        Then Change rating input value
        And I click on submit review
        And I click on cancel review
        And Rest Api will return success response
        And ordermangement failed to submit order review