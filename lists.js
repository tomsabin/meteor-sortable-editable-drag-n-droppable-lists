Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Template.items.items = function () {
    return Items.find();
  }

  Template.items.events({
    'click input': function () {
      console.log('You pressed the button');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Items.find().count() === 0) {
      _.each(
        ['One', 'Two', 'Three'], function (body, index) {
          Items.insert({ body: body, position: index });
        }
      );
    }
  });
}
