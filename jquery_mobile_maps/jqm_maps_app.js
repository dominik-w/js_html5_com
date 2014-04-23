
/*
 * Google Maps demo for jQuery Mobile app
 */

$(document).on( "pageinit", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(52.5242680, 13.4062900);  // default: Berlin
    
    if (navigator.geolocation) {
        function success(pos) {
            // location found - show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        
        function fail(error) {
            drawMap(defaultLatLng);  // failed - show default map
        }
        
        // find the user's current position; cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 });
        
    } else {
        drawMap(defaultLatLng);  // no geolocation support - show default map
    }
    
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById("map-area"), myOptions);
        
        // add an overlay to the map
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Hello!"
        });
    }
});
