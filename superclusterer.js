MarkerSuperClusterer = function(map, opt_markers, opt_options) {
    clusterer = new MarkerClusterer(map, opt_markers, opt_options);

    /**
     * Calculate cluster sizes and colors.
     */
    clusterer.setCalculator(function(markers, numStyles) {
        var title = "";
        var count = markers.length;

        for (var i = 0; i < markers.length; i++) {
            if (typeof markers[i].count != 'undefined') {
                count += (markers[i].count - 1);
            }
        }

        var index = styleFromCount(count, numStyles);

        return {
            text: count.toString(),
            index: index,
            title: title
        };
    });

    clusterer.addCluster = function(marker, count) {
        marker.setMap(null);
        var markers = [];

        var style = clusterer.getStyles()[styleFromCount(count, clusterer.getStyles().length) - 1];
        var icon = new google.maps.MarkerImage(style.url, null, null,
                                               new google.maps.Point(style.width / 2, style.height / 2));
        var cluster_marker = new MarkerWithLabel({
            labelContent: count.toString(),
            labelStyle: {'fontFamily': 'arial,sans-serif',
                         'fontWeight': 'bold',
                         'fontSize': '11px'},
            labelAnchor: new google.maps.Point(3 * count.toString().length, 6),
            position: marker.position,
            map: map,
            title: marker.title,
            icon: icon
        });
        cluster_marker.count = count;
        google.maps.event.addListener(cluster_marker, 'click', function() {
            if (clusterer.getZoomOnClick()) {
                clusterer.getMap().setZoom(clusterer.getMap().getZoom() + 1);
                clusterer.getMap().setCenter(marker.position);
            }
        });

        this.addMarker(cluster_marker);
    }

    return clusterer;
}


function styleFromCount(count, numStyles) {
    var index = 0;
    var dv = count;
    while (dv !== 0) {
        dv = parseInt(dv / 10, 10);
        index++;
    }
    index = Math.min(index, numStyles);
    return index;
}
