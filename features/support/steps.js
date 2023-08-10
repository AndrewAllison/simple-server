const pactum = require('pactum')
const { Given, When, Then, After, Before } = require('@cucumber/cucumber')

let spec = pactum.spec()

Before(() => {
  spec = pactum.spec();
});

Given(/^I make a "(.*)" request to "(.*)"$/,  async function(method, endpoint) {
  this.method = method.toLowerCase()
  this.url = `http://localhost:6001${endpoint}`;
})

Given('I set body to', function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch(error) {
    spec.withBody(body);
  }
});

When(/I receive a response/, async function() {
  await spec[ this.method ](this.url)
})

Then('I expect response should have a status {int}', function (statusCode){
  spec.response().should.have.status(statusCode)
})

After(() => {
  spec.end();
});
