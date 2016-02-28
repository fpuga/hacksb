

var where = new Backbone.HACKSB.Where();

var domains = DOMAINS_REPO;


var points = new Backbone.HACKSB.PointCollection();

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


var mapView = new Backbone.HACKSB.MapView({
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

