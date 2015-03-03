var Person = Backbone.Model.extend({
  defaults: {
    name: 'Guest User',
    age: 23,
    occupation: 'Worker'
  }
});

var PersonView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.model.get('name') + ' (' + this.model.get('age') + ') - ' + this.model.get('occupation'));
  }
});

