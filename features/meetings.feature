Feature: Meeting Requests

  @meetings_api
  Scenario: Get all meetings list from API
    Given I make a "GET" request to "/api/v1/meetings"
    When I receive a response
    Then I expect response should have a status 200

  @meetings_api
  Scenario: Creating a Meeting
    Given I make a "POST" request to "/api/v1/meetings"
    And I set body to
      """
      {
          "description": "TEST MEETING!!",
          "notes": "Notes",
          "startDateTime": "2023-08-03T11:00:00.000Z",
          "endDateTime": "2023-08-03T11:00:00.000Z"
      }
      """
    When I receive a response
    Then I expect response should have a status 201
