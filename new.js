

var domains = DOMAINS_REPO;

    var provincias = domains.byCategory('provincia');
    var distritos = domains.byCategory('distrito');
    var postos = domains.byCategory('posto');
    var bacias = domains.byCategory('bacia');
    var subacias = domains.byCategory('subacia');
    var estadosLicencia = domains.byCategory('licencia_estado');
    var actividades     = domains.byCategory('actividade');
    // var tiposFonte      = domains.byCategory('tipo-fonte');



var point = new Backbone.HACKSB.Point();


// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([42.24, -8.75], 10);

L.tileLayer('https://api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnB1Z2EiLCJhIjoiRTNkN1h1OCJ9.jfJA6rSdkFVm_AKa3w4vRA', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
      polyline: false,
      polygon: false,
      rectangle: false,
      circle: false
    }
});
map.addControl(drawControl);

var mypoint = {};
map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        // Do marker specific actions
    }
    mypoint.lat = layer._latlng.lat
    mypoint.lon = layer._latlng.lng
    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);
});

map.locate({
  setView : true,
  maxZoom: 11
});

new Backbone.SIXHIARA.ButtonSaveView({
  el: $('#save-button'),
  model: point,
  map: map,
  layer: drawnItems,
  mypoint: mypoint
}).render();

// block info
new Backbone.UILib.WidgetsView({
  el: $('#info'),
  model: point
}).render();





