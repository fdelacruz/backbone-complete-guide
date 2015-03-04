(function(){ 

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id) {
    return _.template($('#' + id).html());
  };

  // Person Model
  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: 'Guest User',
      age: 23,
      occupation: 'Worker'
    }
  });

  // A list of People
  App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
  });

  // View for all People
  App.Views.People = Backbone.View.extend({
    tagName: 'ul',

    initialize: function () {
      this.collection.on('add', this.addOne, this);
    },

    render: function(){
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne: function(person){
        var personView = new App.Views.Person({ model: person });
        this.$el.append(personView.render().el);
      }
  });

  // The View for a Person
  App.Views.Person = Backbone.View.extend({
    tagName: 'li',

    template: template('personTemplate'),

    initialize: function () {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'click .edit' : 'editPerson',
      'click .delete' : 'destroyPerson'
    },

    editPerson: function () {
      var newName = prompt("Please enter the new name", this.model.get('name'));
      if (!newName)return; // don't anything if cancel is pressed..
      this.model.set('name', newName);
    },

    destroyPerson: function () {
      this.model.destroy();
    },

    remove: function () {
      this.$el.remove();
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  App.Views.AddPerson = Backbone.View.extend({
    el: '#addPerson',

    events: {
      'submit' : 'submit'
    },

    submit: function(e) {
      e.preventDefault();
      var newPersonName = $(e.currentTarget).find('input[type=text]').val();
      var person = new App.Models.Person({ name: newPersonName });
      this.collection.add(person);
    }
  });

  var peopleCollection = new App.Collections.People([
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

  var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
  var peopleView = new App.Views.People({ collection: peopleCollection });
  $(document.body).append(peopleView.render().el)
})();
