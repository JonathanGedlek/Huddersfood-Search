function loadMapStyle(url){
    fetch(url).then(function(response){
        return response.json();
    }).then(function(json){
        const mapStyle = json;

        var mapOptions = {
            center: new google.maps.LatLng("53.644045", "-1.777420"),
            zoom: 16,
            disableDefaultUI: false,
            mapTypeControl: true,
            gestureHandling: "greedy",
            //map style JSON information
            styles: mapStyle
        };
        //creates an google map object using preset map options and attaches it to the dom
        var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    });
}

function init(){
    loadMapStyle("./json/map-style.json");
}

google.maps.event.addDomListener(window, "load", init);
