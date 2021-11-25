Feature: OTPInputAuth

    Scenario: User navigates to OTPInputAuth
        Given I am a User loading OTPInputAuth
        When I navigate to the OTPInputAuth
        Then OTPInputAuth will load with out errors
        And I can leave the screen with out errors