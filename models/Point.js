Backbone.HACKSB = Backbone.HACKSB || {};
Backbone.HACKSB.Point = Backbone.GeoJson.Feature.extend({

  urlRoot: '/exploracao',
  idAttribute: 'cartodb_id',
 
  defaults: {
    'cartodb_id':     '',
    'description':   '',
    'event_owner':   '',
    'event_tags': [],
    'event_time': '',
    'event_type': '', // 'Automáticao', 'Alerta', 'Usuario'
    'name':  '',
    
    /*
    'utente':     new Backbone.SIXHIARA.Utente(), // FIXME. No se está rellenando como un modelo si no como obj js
    'licencias':  new Backbone.SIXHIARA.LicenciaCollection(),
    'fontes':     new Backbone.SIXHIARA.FonteCollection(),
    'actividade': '',
    */
    'loc_country': 'España', // Using geocoding should get the closest to the real point
    'loc_city': 'Vigo',
    'consumo': 'C', // FIXME. Está en las fixtures
    'estado':  'L', // FIXME. Está en las fixtures
    'pagos':   'P', // FIXME. Está en las fixtures
  },

  validate: function(attrs, options){
    var messages = [];
    if((attrs.exp_id === '') || (attrs.exp_id === undefined) || (attrs.exp_id === null)){
      messages.push('Nº de exploracão vacío')
    }
    var nome = this.get('utente').get('nome');
    if((nome === '') || (nome === undefined) || (nome === null)){
      messages.push('Nome de utente vacío')
    }
    if (messages.length > 0) return messages;
  }

});
