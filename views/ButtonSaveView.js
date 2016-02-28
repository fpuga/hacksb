Backbone.SIXHIARA = Backbone.SIXHIARA || {};
Backbone.SIXHIARA.ButtonSaveView = Backbone.View.extend({

  events: {
    "click": "save"
  },

  initialize: function(options){
     this.map = options.map;
     this.layer = options.layer;
     this.mypoint = options.mypoint
  },
  // render: function(){
  // },

  save: function(){

    var name = $('#name').val();
    var desc = $('#description').val();
    var lat = mypoint.lat;
    var lon = mypoint.lon;
    
    var api_key = '64e8707d60397bcb8666f1c86e165b96bd7a2851';
    var sql = "https://fpuga.cartodb.com/api/v2/sql?q=INSERT INTO hacksb (the_geom, description, username, event_tags, event_type, name) VALUES (ST_GeomFromText('POINT(" + lon + " " + lat + ")', 4326),'" + desc + "', 'fpuga', null, 'Usuario', '" + name + "')&api_key=" + api_key

    $.post( sql, function( data ) {
      console.log(data);
      window.location = 'search.html?username=fpuga';
    });
    

  }

});
