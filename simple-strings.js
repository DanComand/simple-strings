Strings = new Mongo.Collection("strings");

if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    strings: function () {
      return Strings.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
