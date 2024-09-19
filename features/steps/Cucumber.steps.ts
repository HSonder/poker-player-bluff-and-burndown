import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';

Given('I have a configured cucumber environment', function () {
  console.log('Given step executed');
});

When('I run the tests', function () {
  console.log('When step executed');
});

Then('I should see the results', function () {
  console.log('Then step executed');
  assert.equal(true, true);
});
