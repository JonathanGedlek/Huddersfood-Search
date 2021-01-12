function createMap(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
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
        createMarkers(map);
    });
}

function createMarkers(map) {
    fetch("./json/takeaways.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        const takeaways = json;
        takeaways.forEach(function (takeaway) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(takeaway.lat, takeaway.lng),
                map,
            })
            const contentString =
                '<div id="infoWindow">' +
                '<img id="img" src="./pictures/' + takeaway.logo + '" alt="Logo Image">' +
                '<div id="name">' + takeaway.name + '</div>' +
                '<a href="details.html?id=' + takeaway.id + '">View</a>' +
                '<div id="address">' + takeaway.address + '</div>';
            const infoWindow = new google.maps.InfoWindow({
                content: contentString,
            })
            marker.addListener("click", () => {
                infoWindow.open(map, marker)
            })
        });
    });
}


function init() {
    createMap("./json/map-style.json");

}

google.maps.event.addDomListener(window, "load", init);
