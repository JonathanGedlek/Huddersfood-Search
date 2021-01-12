function loadTakeaways(url, callback) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        callback(json)
    });
}

function createMarker(lat, lng, map) {
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map,
    })
}

function createMap(lat, lng) {
    fetch("./json/map-style.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        const mapStyle = json;

        var mapOptions = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 15,
            disableDefaultUI: false,
            mapTypeControl: true,
            gestureHandling: "greedy",
            //map style JSON information
            styles: mapStyle
        };
        //creates an google map object using preset map options and attaches it to the dom
        map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

        createMarker(lat, lng, map);
    });
}


function takeawayDetails(takeaway) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const name = document.getElementById("name");
    const picture = document.getElementById("picture");
    const logo = document.getElementById("logo");
    const description = document.getElementById("description");
    const food_type = document.getElementById("food_type");
    const price_lvl = document.getElementById("price_lvl");
    const web_link = document.getElementById("web_link");
    const address = document.getElementById("address");
    const lat = takeaway[id].lat;
    const lng = takeaway[id].lng;
    
    name.textContent = takeaway[id].name;
    picture.setAttribute("src", "./pictures/" + takeaway[id].picture);
    logo.setAttribute("src", "./pictures/" + takeaway[id].logo);
    description.textContent = takeaway[id].description;
    food_type.textContent = takeaway[id].food_type;
    price_lvl.textContent = takeaway[id].price_lvl;
    web_link.textContent = takeaway[id].web_link;
    address.innerHTML = takeaway[id].address;

    createMap(lat, lng);
}

function init() {
    loadTakeaways("./json/takeaways.json", takeawayDetails);
}


google.maps.event.addDomListener(window, "load", init);




