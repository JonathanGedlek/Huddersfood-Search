function createMap(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        const mapStyle = json;

        var mapOptions = {
            center: new google.maps.LatLng("53.64661378473948", "-1.782342991579756"),
            zoom: 15,
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
            var icon = {
                url: "./pictures/markers/"+takeaway.marker,
                scaledSize: new google.maps.Size(50,50)
            };

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(takeaway.lat, takeaway.lng),
                map,
                icon:icon
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

function openNav() {
    document.getElementById("Sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


function init() {
    createMap("./json/map-style.json");

}

google.maps.event.addDomListener(window, "load", init);
