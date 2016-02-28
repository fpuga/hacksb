var points = new Backbone.HACKSB.PointCollection();


  var cartodb_id = window.location.search.split('=')[1];
  points.url = 'https://fpuga.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT cartodb_id, the_geom, st_x(the_geom) as loc_lon, st_y(the_geom) as loc_lat, the_geom_webmercator, description, username, event_tags, event_time, event_type, name FROM hacksb WHERE cartodb_id = ' + cartodb_id,

  points.fetch({
    parse: true,
    success: function(){
      var point = points.at(0);
      // block info
      new Backbone.UILib.WidgetsView({
        el: $('#info'),
        model: point
      }).render();

      // block utente
      new Backbone.UILib.WidgetsView({
        el: $('#utente'),
        model: point
      }).render();
      
      var base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


var pointGeoJson = L.geoJson(point.toGeoJSON());


var map = L.map('map', {
  center: [42.24, -8.75],
  zoom: 10,
  layers: [base, pointGeoJson]
});

var baseMaps = {};
var overlayMaps = {
  'Exploração': pointGeoJson
};
L.control.layers(baseMaps, overlayMaps).addTo(map);

var drawnItems = new L.GeoJSON();
var drawControl = new L.Control.Draw({
  draw: {
    circle: false,
    rectangle: false,
    marker: false,
    polyline: false
  },
  edit: {
    featureGroup: pointGeoJson
  }
});
map.addControl(drawControl);

map.on('draw:start', function (e) {
  var type = e.layerType,
  layer = e.layer;

  if (type === 'marker') {
    // Do marker specific actions
  }

  // Do whatever else you need to. (save to db, add to map etc)
  // exploracao.addData(drawnItems);
});

new Backbone.SIXHIARA.ButtonDeleteView({
  el: $('#delete-button'),
  model: point
});


    },
    error: function(){
      alert("un error");
    }
  });








