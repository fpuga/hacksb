Backbone.HACKSB = Backbone.HACKSB || {};
Backbone.HACKSB.PointCollection = Backbone.GeoJson.FeatureCollection.extend({

    model: Backbone.HACKSB.Point,
    url: 'https://fpuga.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT cartodb_id, the_geom, the_geom_webmercator, description, username, event_tags, event_time, event_type, name FROM hacksb',

    filterBy: function(where){

      a = this.filter(function(element) {
        if (! _.isEmpty(where.buscar)) {
            var donde_buscar_keys = ['name', 'description'];
            var flag = false;
            for (var i=0; i < donde_buscar_keys.length; i++) { 
              if (element.get(donde_buscar_keys[i]).toLowerCase().indexOf(where.buscar.toLowerCase()) != -1) {
                var properties = _.defaults(element.pick(_.keys(where)), {buscar: where.buscar});
                flag = flag || _.isEqual(properties, where);
              } else {
                flag = flag || false;
              }
            }
            return flag;
      }


        var properties = element.pick(_.keys(where));
        return _.isEqual(properties, where);
      });
      return new Backbone.HACKSB.PointCollection(a);
    }

});
