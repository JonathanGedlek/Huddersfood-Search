const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

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
            zoom: 18,
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
    const name = document.getElementById("name");
    const picture = document.getElementById("picture");
    const logo = document.getElementById("logo");
    const description = document.getElementById("description");
    const food_type = document.getElementById("food_type");
    const web_link = document.getElementById("web_link");
    const address = document.getElementById("address");
    const lat = takeaway[id].lat;
    const lng = takeaway[id].lng;
    name.textContent = takeaway[id].name;
    picture.setAttribute("src", "./pictures/" + takeaway[id].picture);
    logo.setAttribute("src", "./pictures/" + takeaway[id].logo);
    web_link.setAttribute("href", takeaway[id].web_link);
    description.textContent = takeaway[id].description;
    food_type.textContent = takeaway[id].food_type;
    address.innerHTML = takeaway[id].address;

    createMap(lat, lng);
}

function saveTakeaway() {
    if (localStorage.getItem("favourites") === null) {
        var favourites = id + " ";
        localStorage.setItem("favourites", favourites);
    }
    else {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        if (arr.includes(id) == false) {
            var favourites = retrievedData + id + " ";
            localStorage.setItem("favourites", favourites);
        }
    }
}

function deleteTakeaway(){
    if (localStorage.getItem("favourites") != null) {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        var favourites = "";
        for(i=0;i < arr.length;i++){
            if (arr[i] != id){
                favourites += arr[i] + " ";
            }
        }
        localStorage.setItem("favourites", favourites);
    }
}

function checkIfFavourited(){
    if (localStorage.getItem("favourites") != null) {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        if(arr.includes(id)){
            var favouriteLink = document.getElementById("favourite");
            favouriteLink.style.display = "none";
        }
        else{
            var deleteLink = document.getElementById("delete");
            deleteLink.style.display = "none";
        }
    }
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
    loadTakeaways("./json/takeaways.json", takeawayDetails);
    checkIfFavourited();
}

google.maps.event.addDomListener(window, "load", init);

document.getElementById("favourite").onclick = function () { saveTakeaway() };

document.getElementById("delete").onclick = function () { deleteTakeaway() };




