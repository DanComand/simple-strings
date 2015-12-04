if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    strings: [
      { text: "this is string 1" },
      { text: "this is string 2" },
      { text: "this is string 3 "}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
