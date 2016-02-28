Backbone.HACKSB = Backbone.HACKSB || {};

var markers = {};
function getMarker(feature, latlng) {
	return L.circleMarker(latlng, geojsonMarkerOptionsDarkGreen);
}

Backbone.HACKSB.MapView = Backbone.View.extend({

  initialize: function(){
  // https://backend.navioni1cs.io/tile/{z}/{x}/{y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&navtoken=TmF2aW9uaWNzX2ludGVybmFscHVycG9zZV8wMDAwMSt3ZWJhcHAubmF2aW9uaWNzLmNvbQ%3D%3D
  // https://api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnB1Z2EiLCJhIjoiRTNkN1h1OCJ9.jfJA6rSdkFVm_AKa3w4vRA
  
    var base = L.tileLayer('https://backend.navionics.io/tile/{z}/{x}/{y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&navtoken=TmF2aW9uaWNzX2ludGVybmFscHVycG9zZV8wMDAwMSt3ZWJhcHAubmF2aW9uaWNzLmNvbQ%3D%3D', {
      attribution: '&copy; <a href="http://navionics.com">Navionics</a>'
    });

    this.geoJSONLayer = L.geoJson(this.collection.toGeoJSON(), {
      pointToLayer: function (feature, latlng) {
		var marker = getMarker(feature, latlng);
		markers[feature.array_number] = marker;
	    return marker;
	  },
	  style: geojsonMarkerOptionsDarkGreen
    });
    this.map = L.map(this.el.id, {
      center: [42.24, -8.75],
      zoom: 8,
      layers: [base, this.geoJSONLayer]
    });

    if(this.collection.length > 0){
      this.map.fitBounds(this.geoJSONLayer.getBounds())
      .setMaxBounds(this.geoJSONLayer.getBounds().pad(0.5));
    } else{
      this.map.fitBounds([[42.24, -8.75]]);
    }
  },

  update: function(newCollection){
    this.collection = newCollection;
    this.geoJSONLayer.clearLayers();
    if(this.collection.length > 0){
      this.geoJSONLayer.addData(this.collection.toGeoJSON());
      this.geoJSONLayer.setStyle( function () {
      
        return geojsonMarkerOptionsDarkGreen;
      
      });
      this.map.fitBounds(this.geoJSONLayer.getBounds())
      .setMaxBounds(this.geoJSONLayer.getBounds().pad(0.5));
    } else{
      this.map.fitBounds([[42.24, -8.75]]);
      this.map.setZoom(8);
    }
  },

});
