MarkerSuperClusterer = function(map, opt_markers, opt_options) {
    var clusterer = new MarkerClusterer(map, opt_markers, opt_options);

    clusterer.addCluster = function(marker, count) {
        marker.setMap(null);
        var markers = [];
        for (var i = 0; i < count; i++) {
            var marker = new google.maps.Marker({
                position: marker.position,
                map: map,
                title: marker.title,
                icon: marker.icon,
            });
            markers.push(marker);
        }
        this.addMarkers(markers);
    }

    return clusterer;
}
