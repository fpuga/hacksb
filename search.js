

var where = new Backbone.SIXHIARA.Where();

var domains = DOMAINS_REPO; // Descomentar para trabajar con fixtures
// var exploracaos = EXPLORACAOS_REPO; // Descomentar para trabajar con fixtures


var points = new Backbone.HACKSB.PointCollection();

/*
var domains = new Backbone.UILib.DomainCollection();
domains.url = '/domains';

domains.fetch({
  success: function(collection, response, options) {
  
    new Backbone.SIXHIARA.FiltersView({
      el: $('#filters'),
      model: where,
      domains: domains,
  }).render();
 
  }
});
*/

new Backbone.HACKSB.FiltersView({
    el: $('#filters'),
    model: where,
    domains: domains,
}).render();
  
var listView = new Backbone.UILib.ListView({
  el: $('#project_list'),
  collection: points,
  subviewTemplate: _.template($('#point-li-tmpl').html())
});

listView.listenTo(where, 'change', function(model, options){
  this.update(points.filterBy(where.values()));
});


var mapView = new Backbone.SIXHIARA.MapView({
  el: $('#map'),
  collection: points
});
mapView.listenTo(where, 'change', function(model, options){
  this.update(points.filterBy(where.values()));
});


points.fetch({
  parse: true,
  success: function() {
    where.trigger('change');
  }
})

