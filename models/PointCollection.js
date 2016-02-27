Backbone.HACKSB = Backbone.HACKSB || {};
Backbone.HACKSB.PointCollection = Backbone.GeoJson.FeatureCollection.extend({

    model: Backbone.HACKSB.Point,
    url: '/exploracaos',

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
