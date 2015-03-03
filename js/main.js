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

// View for all People
var PeopleView = Backbone.View.extend({
  tagName: 'ul',
  render: function(){
    this.collection.each(function(person){
      var personView = new PersonView({ model: person });
      this.$el.append(personView.render().el);
    }, this);
    return this;
  }
});

// The View for a Person
var PersonView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#personTemplate').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
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
