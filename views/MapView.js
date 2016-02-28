Backbone.HACKSB = Backbone.SIXHIARA || {};
Backbone.HACKSB.MapView = Backbone.View.extend({

  initialize: function(){
    var base = L.tileLayer('https://api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnB1Z2EiLCJhIjoiRTNkN1h1OCJ9.jfJA6rSdkFVm_AKa3w4vRA', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    this.geoJSONLayer = L.geoJson(this.collection.toGeoJSON());
    this.map = L.map(this.el.id, {
      center: [42.24, -8.75],
      zoom: 8,
      layers: [base, this.geoJSONLayer]
    });

    if(this.collection.length > 0){
      this.map.fitBounds(this.geoJSONLayer.getBounds())
      .setMaxBounds(this.geoJSONLayer.getBounds().pad(0.5));
    } else{
      // TODO: zoom to the northen area of Mozambique
      this.map.fitBounds([[42.24, -8.75]]);
    }
  },

  update: function(newCollection){
    this.collection = newCollection;
    this.geoJSONLayer.clearLayers();
    if(this.collection.length > 0){
      this.geoJSONLayer.addData(this.collection.toGeoJSON());
      this.map.fitBounds(this.geoJSONLayer.getBounds())
      .setMaxBounds(this.geoJSONLayer.getBounds().pad(0.5));
    } else{
      // TODO: zoom to the northen area of Mozambique
      this.map.fitBounds([[42.24, -8.75]]);
      this.map.setZoom(8);
    }
  },

});
