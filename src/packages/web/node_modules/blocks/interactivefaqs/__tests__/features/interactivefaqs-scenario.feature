Feature: interactivefaqs

    Scenario: User navigates to interactivefaqs
        Given I am a User loading interactivefaqs
        When I navigate to the interactivefaqs
        Then interactivefaqs will load with out errors
        And I can leave the screen with out errors