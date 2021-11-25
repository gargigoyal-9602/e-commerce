Feature: ConnectedAccounts

    Scenario: User navigates to ConnectedAccounts
        Given I am a User loading ConnectedAccounts
        When I navigate to the ConnectedAccounts
        Then ConnectedAccounts will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to ConnectedAccounts and press backbutton
        Given I am a User loading ConnectedAccounts
        When I navigate to the ConnectedAccounts and press backbutton
        Then The App will go back in navigation