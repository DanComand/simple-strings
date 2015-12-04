Strings = new Mongo.Collection("strings");

if (Meteor.isClient) {
  // counter starts at 0
  Template.body.helpers({
    strings: function () {
      return Strings.find({}, {sort: {createdAt: -1}});
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
        createdAt: new Date()
      });

      //clear form
      event.target.text.value = "";

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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
