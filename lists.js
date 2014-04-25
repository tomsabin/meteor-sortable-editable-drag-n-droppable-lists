Items = new Meteor.Collection('items');

Items.before.insert(function (userId, doc) {
  var position, highestItem;
  highestItem = Items.findOne({},
                     { sort: { position: -1 },
                     limit: 1});

  if (typeof highestItem !== "undefined" && highestItem !== null) {
    position = highestItem.position;
  } else {
    position = 0;
  }

  doc.position = position + 1;
});

if (Meteor.isClient) {
  Template.items.items = function () {
    return Items.find({}, {sort: {'position': 1}});
  }

  Template.items.events({
    focusout: function (e) {
      console.log('Update item body');
    },
    'click input': function () {
      console.log('Insert new item');
    }
  });

  Template.items.rendered = function () {
    $('ul').sortable({
      handle: '.handle',
      stop: function (event, ui) {
        console.log('Update '+$(event.target).children('li').length+' positions');
      }
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Items.find().count() === 0) {
      _.each(
        ['foo', 'bar', 'baz', 'qux'], function (body, index) {
          Items.insert({ body: body, position: index + 1 });
        }
      );
    }
  });
}
