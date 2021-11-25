Feature: forgotpassword

    Scenario: User navigates to forgotpassword
        Given I am a User loading forgotpassword
        When I navigate to the forgotpassword
        Then forgotpassword will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to newpassword
        Given I am a User loading newpassword
        When I navigate to the newpassword
        Then newpassword will load with out errors
        And I can leave the screen with out errors