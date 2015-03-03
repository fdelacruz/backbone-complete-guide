// Person Model
var Person = Backbone.Model.extend({
  defaults: {
    name: 'Guest User',
    age: 23,
    occupation: 'Worker'
  }
});

// A list of People
var PeopleCollection = Backbone.Collection.extend({
  model: Person
});

// The View for a Person
var PersonView = Backbone.View.extend({
  tagName: 'li',

  my_template: _.template( $('#personTemplate').html()),

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.my_template(this.model.toJSON()));
  }
});

var peopleCollection = new PeopleCollection([
    {
      name: 'Mohit Jain',
      age: 26
    },
    {
      name: 'Taroon Tyagi',
      age: 25,
      occupation: 'Web Designer'
    },
    {
      name: 'Rahul Narang',
      age: 26,
      occupation: 'Java Developer'
    }  
]);
