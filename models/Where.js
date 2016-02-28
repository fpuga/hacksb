Backbone.HACKSB = Backbone.HACKSB || {};
Backbone.HACKSB.Where = Backbone.Model.extend({

  defaults: {
    'cartodb_id':     '',
    'description':   '',
    'event_owner':   '',
    'event_tags': [],
    'event_time': '',
    'event_type': '', // 'Automáticao', 'Alerta', 'Usuario'
    'name':  '',
    'buscar': ''
  },

  values: function(){
    // only return those pairs that are not void
    return _.omit(this.toJSON(), function(value, key, object){
      return _.isEmpty(value);
    });
  },

});
