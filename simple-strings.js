Strings = new Mongo.Collection("strings");

if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    strings: function () {
      if (Session.get("hideCompleted")) {
        return Strings.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
      return Strings.find({}, {sort: {createdAt: -1}});
    }
   },
   hideCompleted: function () {
    return Session.get("hideCompleted");
   },
   incompleteCount: function () {
    return Strings.find({checked: {$ne: true}}).count();
   } 
  });

  Template.body.events({
    "submit .new-string": function(event) {
      event.preventDefault();

      //get text from form  
      var text = event.target.text.value;

      // insert new string into the collection
      Strings.insert({
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

      //clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.string.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Strings.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Strings.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
