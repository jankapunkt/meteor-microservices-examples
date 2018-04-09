// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by message-bus.js.
import { name as packageName } from "meteor/microserviceexamples:message-bus";

// Write your tests here!
// Here is an example.
Tinytest.add('message-bus - example', function (test) {
  test.equal(packageName, "message-bus");
});
