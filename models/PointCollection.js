Backbone.HACKSB = Backbone.HACKSB || {};
Backbone.HACKSB.PointCollection = Backbone.GeoJson.FeatureCollection.extend({

    model: Backbone.HACKSB.Point,
    url: 'https://fpuga.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT cartodb_id, the_geom, the_geom_webmercator, description, username, event_tags, event_time, event_type, name FROM hacksb',

    filterBy: function(where){
      a = this.filter(function(element) {
        var properties = element.pick(_.keys(where));
        if (properties.utente) {
          properties.utente = properties.utente.nome;
        }
        return _.isEqual(properties, where);
      });
      return new Backbone.HACKSB.PointCollection(a);
    }

});
