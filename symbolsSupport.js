var geojsonDefaultMarkerOptions = {
	    radius: 8,
	    fillColor: "#ffffff",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};

var geojsonMarkerOptionsTurqoise = {
    radius: 8,
    fillColor: "#00ff80",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsDarkGreen = {
    radius: 8,
    fillColor: "#298A08",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsLightGreen = {
    radius: 8,
    fillColor: "#AFDD0C",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsYellow = {
    radius: 8,
    fillColor: "#ffff00",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsOrange = {
    radius: 8,
    fillColor: "#ff8000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsRed = {
    radius: 8,
    fillColor: "#ff0000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsWhite = {
    radius: 8,
    fillColor: "#ffffff",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsPurple = {
    radius: 8,
    fillColor: "#770549",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var geojsonMarkerOptionsBlack = {
	    radius: 8,
	    fillColor: "#000000",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};

var catvisMarkerOptions = {
    radius: 5,
    fillColor: "#ffffff",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var catvisHighlightMarkerOptions = {
    radius: 5,
    fillColor: "#FAAC58",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var booleansNoSuccess = {
	'no' : "label-success",
	'sí' : "label-danger"
};

var booleansYesSuccess = {
	'si' : "label-success",
	'no' : "label-danger"
};

var elementStateBase = {
	'no existen' : 'label-default',
	'bien' : 'label-success',
	'regular' : 'label-warning',
	'mal' : 'label-danger'
};

var elementState = jQuery.extend(true, {}, elementStateBase);
elementState['no existe'] = elementState['no existen'];

var currentMapLegend = 0;

var mapLegend = [
	{
		valueCompareField : 'estim_coste_reparacion',
		valueCompareLabel: 'Coste',
		barriers : [30000, 50000, 85000, 120000],
		markers : [geojsonMarkerOptionsWhite, geojsonMarkerOptionsDarkGreen, geojsonMarkerOptionsLightGreen, geojsonMarkerOptionsYellow, geojsonMarkerOptionsOrange, geojsonMarkerOptionsRed]
	},
	{
		valueCompareField : 'equilibrio_actual',
		valueCompareLabel: 'Estabilidad',
		values : ['estable', 'moderadamente inestable', 'inestable (factor de seguridad)', 'muy inestable (factor de seguridad)', 'peligroso (factor de seguridad)'],
		markers : [geojsonMarkerOptionsWhite, geojsonMarkerOptionsDarkGreen, geojsonMarkerOptionsLightGreen, geojsonMarkerOptionsYellow, geojsonMarkerOptionsOrange, geojsonMarkerOptionsRed, geojsonMarkerOptionsBlack]
	},
	{
		valueCompareField : 'prox_inspeccion',
		valueCompareLabel: 'Próx. inspección',
		values : [/(1 mes|3 meses)/i, /6 meses/i, /(12 meses|anual)/i],
		markers : [geojsonMarkerOptionsWhite, geojsonMarkerOptionsRed, geojsonMarkerOptionsYellow, geojsonMarkerOptionsDarkGreen, geojsonMarkerOptionsBlack]
	},
	{
		valueCompareField : 'estim_estudio_exhaustivo',
		valueCompareLabel: 'Estudio',
		values : ['no', /nota técnica/i, /informe detallado/i],
		markers : [geojsonMarkerOptionsWhite, geojsonMarkerOptionsDarkGreen, geojsonMarkerOptionsYellow, geojsonMarkerOptionsRed, geojsonMarkerOptionsBlack]
	}
];

var valuesLegendData = {
		"topografia" : {
			"suave" : "label-success",
			"media" : "label-warning",
			"fuerte" : "label-danger"
		},
		"buzamiento" : {
			"no se aprecia" : "label-default",
			"favorable" : "label-success",
			"irregular" : "label-warning",
			"desfavorable" : "label-danger"
		},
		"fisuras" : {
			"no aparecen" : "label-success",
			"algunas" : "label-warning",
			"muchas" : "label-danger",
			"muchas y con vegetación" : "label-purple"
		},
		"deslizamientos" : booleansNoSuccess,
		"desprendimientos" : booleansNoSuccess,
		"menudeo" : booleansNoSuccess,
		"vegetacion" : {
			"nula" : "label-success",
			"poca" : "label-moderate",
			"algo" : "label-warning",
			"mucha" : "label-danger"
		},
		"presencia_agua" : {
			"seco" : "label-success",
			"ligeramente húmedo" : "label-moderate",
			"húmedo" : "label-warning",
			"gotea" : "label-danger",
			"lluvia" : "label-purple"
		},
		'estado_dren_cunetas' : elementState,
		'estado_dren_drenes' : elementState,
		'estado_dren_tubos' : elementState,
		'estado_dren_arquetas' : elementState,
		'estado_dren_boquillas' : elementState,
		'estado_dren_tajea' : elementState,
		'estado_cont_bulones' : elementState,
		'estado_cont_gunita' : elementState,
		'estado_cont_malla' : elementState,
		'estado_cont_micropilotes' : elementState,
		'estado_cont_anclajes' : elementState,
		'estado_cont_escollera' : elementState,
		'equilibrio_actual' : {
			'estable' : 'label-success',
			'moderadamente inestable' : 'label-moderate',
			'inestable (factor de seguridad)' : 'label-warning',
			'muy inestable (factor de seguridad)' : 'label-danger',
			'peligroso (factor de seguridad)' : 'label-purple'
		},
		'posible_evolucion' : {
			'nula' : 'label-success',
			'poca' : 'label-moderate',
			'lenta' : 'label-warning',
			'rápida' : 'label-danger'
		}
};

var valuesLegend = {
		simple : {
			'TOPOGRAFÍA' : {
				legend: valuesLegendData.topografia
			},
			'BUZAMIENTO' : {
				legend: valuesLegendData.buzamiento
			},
			'FISURAS' : {
				legend: valuesLegendData.fisuras
			},
			'DESLIZAMIENTOS' : {
				legend: valuesLegendData.deslizamientos
			},
			'DESPRENDIMIENTOS' : {
				legend: valuesLegendData.desprendimientos
			},
			'MENUDEO' : {
				legend: valuesLegendData.menudeo
			},
			'VEGETACIÓN' : {
				legend: valuesLegendData.vegetacion
			},
			'PRESENCIA DE AGUA' : {
				legend: valuesLegendData.presencia_agua
			},
			'ELEMENTOS DRENANTES' : {
				components: ['cunetas', 'drenes', 'tubos', 'arquetas', 'boquillas', 'tajea'],
				legend: elementStateBase
			},
			'ELEMENTOS DE CONTENCIÓN' : {
				components: ['bulones', 'gunita', 'malla', 'micropilotes', 'anclajes', 'escollera'],
				legend: elementStateBase
			}
		},
		section: {
			'CONCLUSIONES' : {
				'Equilibrio actual' : {
					legend: valuesLegendData.equilibrio_actual
				},
				'Posible evolución' : {
					legend: valuesLegendData.posible_evolucion
				}
			},
			'RECOMENDACIONES' : {
				'Contención' : {
					components : ['cunetas', 'drenes', 'bulones', 'gunita', 'malla', 'escollera']
				},
				'Cimentación especial' : {
					components : ['anclajes', 'micropilotes', 'pilotes', 'muro pantalla', 'mejora de terreno']
				}
			}
			
		}
};

function generateMapLegend(current) {
    var legend = '<table class="table">\
    	<thead>\
    <tr>\
    	<th colspan="2"><h4><strong>' + mapLegend[current].valueCompareLabel + '</strong></h4></th>\
    </tr>\
    </thead>\
    <tbody>';
    for (var a = 0, len = mapLegend[current].markers.length; a < len; a++) {
    	legend += '<tr>\
    		<td><div class="maplegend-circle" style="background: ' + mapLegend[current].markers[a].fillColor +  '; border-color:' + mapLegend[current].markers[a].color + ';"></div></td>\
    		<td><label class="maplegend-label">';
    	if (a == 0) {
    		legend += 'Sin datos';
    	} else {
        	if (typeof mapLegend[current].barriers !== 'undefined') {
	    		if (a == 1) {
	    			legend += '< ' + mapLegend[current].barriers[0];
	    		} else {
	    			if (a == (len - 1)) {
	    				legend += '> ' + mapLegend[current].barriers[a - 2];
	    			} else {
	    				legend += mapLegend[current].barriers[a - 2] + ' - ' + mapLegend[current].barriers[a - 1];
	    			}
	    		}
    		} else {
            	if (typeof mapLegend[current].values !== 'undefined') {
	    			if (a == (len - 1)) {
	    				legend += ' Otros valores';
	    			} else {
	                	if (typeof mapLegend[current].values[a - 1] === 'string') {
	                		legend += mapLegend[current].values[a - 1];
	                	} else {
	                		legend += mapLegend[current].values[a - 1].toString().replace(/(\/i$|\(|\))/g , '').replace('/' , '') .replace('|', ' | ');
	                	}
	    			}
        		}
    			
    		}
    	}
    	legend += '</label></td>\
    		</tr>';
    }
    legend += '</table>';
    $('#maplegend-modal-body').html(legend);
}

function generateMapLegendSelector() {
	if (mapLegend.length < 2) {
		$('#maplegend-modal-selector').remove();
	}
    var legendSelector = '';
    for (var a = 0, len = mapLegend.length; a < len; a++) {
    	legendSelector += '<input type="radio" name="maplegend" onclick="updateLegend(' + a + ');"';
    	if (a == currentMapLegend) {
    		legendSelector += ' checked';
    	}
    	legendSelector += '><label>' + mapLegend[a].valueCompareLabel + '</label>';
    	if (a % 2 == 1) {
    		legendSelector += '<br>';
    	}
    }
    $('#maplegend-modal-selector').html(legendSelector);
}

function generateDataLegend() {
    var legend = '<table class="table table-condensed">\
        <tbody>';

    for (var a in valuesLegend.simple) {
    	if (valuesLegend.simple[a].components) {
    		if (valuesLegend.simple[a].legend) {
    			legend += '<tr><td rowspan="2"><strong>' + a + '</strong></td><td>';
    		} else {
    			legend += '<tr><td><strong>' + a + '</strong></td><td>';
    		}
    		for (var b in valuesLegend.simple[a].components) {
        		legend += '<span class="label label-item">' + valuesLegend.simple[a].components[b] + '</span>\n';
        	}
    		if (valuesLegend.simple[a].legend) {
    			legend += '</td></tr><tr><td>';
    		}
    	} else {
        	legend += '<tr><td><strong>' + a + '</strong></td><td>';
    	}
    	for (var b in valuesLegend.simple[a].legend) {
    		legend += '<span class="label ' + valuesLegend.simple[a].legend[b] + '">' + b + '</span>\n';
    	}
    	legend += '</td></tr>';
    }

    for (var a in valuesLegend.section) {
    	legend += '<tr><td><strong>' + a + '</strong></td><td></td></tr>';
    	for (var b in valuesLegend.section[a]) {
        	if (valuesLegend.section[a][b].components) {
        		if (valuesLegend.section[a][b].legend) {
        			legend += '<tr><td rowspan="2"><strong><span class="glyphicon glyphicon-chevron-right"></span> ' + b + '</strong></td><td>';
        		} else {
        			legend += '<tr><td><strong><span class="glyphicon glyphicon-chevron-right"></span> ' + b + '</strong></td><td>';
        		}
        		for (var c in valuesLegend.section[a][b].components) {
            		legend += '<span class="label label-item">' + valuesLegend.section[a][b].components[c] + '</span>\n';
            	}
        		if (valuesLegend.section[a][b].legend) {
        			legend += '</td></tr><tr><td>';
        		}
        	} else {
            	legend += '<tr><td><strong><span class="glyphicon glyphicon-chevron-right"></span> ' + b + '</strong></td><td>';
        	}
        	for (var c in valuesLegend.section[a][b].legend) {
        		legend += '<span class="label ' + valuesLegend.section[a][b].legend[c] + '">' + c + '</span>\n';
        	}
        	legend += '</td></tr>';
    	}
    }

	legend += '</tbody></table>';
    $('#datalegend-modal-body').html(legend);
}

$(function() {
	generateMapLegendSelector();
	generateMapLegend(currentMapLegend);
	generateDataLegend();

    //Show the legend buttons
    $('#legend-btn').show();
    $('#help-btn').show();
});
