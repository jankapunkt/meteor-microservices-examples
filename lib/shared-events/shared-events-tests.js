// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by shared-events.js.
import { name as packageName } from "meteor/microserviceexamples:shared-events";

// Write your tests here!
// Here is an example.
Tinytest.add('shared-events - example', function (test) {
  test.equal(packageName, "shared-events");
});
