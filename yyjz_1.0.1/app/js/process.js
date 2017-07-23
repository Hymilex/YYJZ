
var usr = $.cookie('user');
if (usr != null) {
    $('#name').html(usr);
    $('#info_user').html(usr + ",欢迎您登陆该系统！");
}
//exit 注销
$("#exit").click(function () {
    $.cookie('user', null);
    $.cookie('pwd', null);
});
var raster = new ol.layer.Tile({ source: new ol.source.OSM() });

var source = new ol.source.Vector({ wrapX: false });

var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});

var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
        center: [-11000000, 4600000],
        zoom: 4
    })
});

var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
    var value = typeSelect.value;
    if (value !== 'None') {
        var geometryFunction, maxPoints;
        if (value === 'Square') {
            value = 'Circle';
            geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        } else if (value === 'Box') {
            value = 'LineString';
            maxPoints = 2;
            geometryFunction = function (coordinates, geometry) {
                if (!geometry) {
                    geometry = new ol.geom.Polygon(null);
                }
                var start = coordinates[0];
                var end = coordinates[1];
                geometry.setCoordinates([
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ]);
                return geometry;
            };
        }
        draw = new ol.interaction.Draw({
            source: source,
            type: (value),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        map.addInteraction(draw);
    }
}
/**
 * Handle change event.
 */
typeSelect.onchange = function () {
    map.removeLayer(draw);
    map.removeInteraction(draw);
    addInteraction();
};
addInteraction();