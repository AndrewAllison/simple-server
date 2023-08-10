const pactum = require('pactum')
const { Given, When, Then, After, Before } = require('@cucumber/cucumber')
const axios = require('axios')
const { add } = require('date-fns')

let spec = pactum.spec()

const apiBaseUrl = 'http://localhost:6001'

Before(() => {
  spec = pactum.spec()
})

Given(/^I make a "(.*)" request to "(.*)"$/, async function (method, endpoint) {
  this.method = method.toLowerCase()
  this.url = `${apiBaseUrl}${endpoint}`
})

Given('That I have an existing meeting', async function () {
  const response = await axios.post(`${apiBaseUrl}/api/v1/meetings`, {
    description: 'Test Meeting Description',
    notes: 'Some notes here to help',
    startDateTime: new Date(),
    endDateTime: add(new Date(), { minutes: 20 }),
  })
  this.meetingId = response.data.id
})

Given('I set body to', function (body) {
  try {
    spec.withJson(JSON.parse(body))
  } catch (error) {
    spec.withBody(body)
  }
})

When(/I receive a response/, async function () {
  await spec[this.method](this.url)
})

When(/I delete the meeting/, async function () {
  await spec.delete(`${apiBaseUrl}/api/v1/meetings/${this.meetingId}`)
})

Then('I expect response should have a status {int}', function (statusCode) {
  spec.response().should.have.status(statusCode)
})

After(() => {
  spec.end()
})
