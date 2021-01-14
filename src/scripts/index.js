//loads the json styling array, creates the map, applies styles and options, applies the map to the DOM
function createMap(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        const mapStyle = json;
        var mapOptions = {
            center: new google.maps.LatLng("53.64661378473948", "-1.782342991579756"),
            zoom: 16,
            disableDefaultUI: false,
            mapTypeControl: true,
            gestureHandling: "greedy",
            //map style JSON information
            styles: mapStyle,
            label: {
                text: "Label text",
                fontFamily: "Helvetica Neue",
            }
        };
        //creates an google map object using preset map options and attaches it to the dom
        var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
        //apply the markers to the map
        createMarkers(map);
    });
}

function createMarkers(map) {
    //get JSON Data
    fetch("./json/takeaways.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        const takeaways = json;
        takeaways.forEach(function (takeaway) {
            //creates custom marker icon
            var icon = {
                url: "./pictures/markers/"+takeaway.marker,
                scaledSize: new google.maps.Size(50,50)
            };

            //create the marker and apply JSON information to it
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(takeaway.lat, takeaway.lng),
                map,
                icon:icon
            })

            //Pre written HTML to define how an info window is constructed in DOM
            const contentString =
                '<div id="infoWindow">' +
                '<div class = "d-flex">'+
                '<img class="infoImg" id="img" src="./pictures/' + takeaway.logo + '" alt="Logo Image">' +
                '<div class="ml-2 mt-2">'+
                '<div class="mb-1 font-weight-bold" id="name">' + takeaway.name + '</div>' +
                '<div id="cuisineType">'+takeaway.food_type + '</div>'+
                '</div>'+
                '</div>'+
                '<div class="d-flex">'+
                '<u class="ml-2 mt-3 "><a class="font-weight-light infoLink" href="details.html?id=' + takeaway.id + '">View</a></u>' +
                '<div class="ml-4 " id="infoAddress">' + takeaway.address + '</div>'+
                '</div>';

            //create the info window and apply DOM to it
            const infoWindow = new google.maps.InfoWindow({
                content: contentString,
            })

            //create listener to active infoWindow on click
            marker.addListener("click", () => {
                infoWindow.open(map, marker)
            })
        });
    });
}

//functionality to open and close burger menu
function openNav() {
    document.getElementById("Sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

//function called on page load, create the google map
function init() {
    createMap("./json/map-style.json");

}

//makes sure dom is loaded before proceeding with any JavaScript
google.maps.event.addDomListener(window, "load", init);
