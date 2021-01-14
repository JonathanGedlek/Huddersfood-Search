
//get id from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//load json from given URL and give to callback function
function loadTakeaways(url, callback) {
    
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        callback(json)
    });
}

//creates a map marker with a custom icon
function createMarker(lat, lng, map, markerURL) {

    var icon = {
        url: "./pictures/markers/" + markerURL,
        scaledSize: new google.maps.Size(50, 50)
    }

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map,
        icon: icon
    })
}

//loads the json styling array, creates the map, applies styles and options, applies the map to the DOM
function createMap(lat, lng, id) {

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

        //apply the marker to the map
        createMarker(lat, lng, map, id);
    });
}


function takeawayDetails(takeaway) {

    //save all the DOM elements as variables
    const name = document.getElementById("name");
    const picture = document.getElementById("picture");
    const logo = document.getElementById("logo");
    const description = document.getElementById("description");
    const food_type = document.getElementById("food_type");
    const web_link = document.getElementById("web_link");
    const address = document.getElementById("address");

    //create coordinates for the map from JSON information
    const lat = takeaway[id].lat;
    const lng = takeaway[id].lng;

    //apply JSON information to the DOM
    name.textContent = takeaway[id].name;
    picture.setAttribute("src", "./pictures/" + takeaway[id].picture);
    logo.setAttribute("src", "./pictures/" + takeaway[id].logo);
    web_link.setAttribute("href", takeaway[id].web_link);
    description.textContent = takeaway[id].description;
    food_type.textContent = takeaway[id].food_type;
    address.innerHTML = takeaway[id].address;

    //call the createMap function and pass JSON information
    createMap(lat, lng, takeaway[id].marker);
}

function saveTakeaway() {

    //if local storage file is empty, then create and attach item
    if (localStorage.getItem("favourites") === null) {
        var favourites = id + " ";
        localStorage.setItem("favourites", favourites);
    }

    //if local storage is populated, get the list, turn it into an array, add the new item to the end of said array
    //then resave the array into storage
    else {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        if (arr.includes(id) == false) {
            var favourites = retrievedData + id + " ";
            localStorage.setItem("favourites", favourites);
        }
    }
}

function deleteTakeaway() {

    //if item is saved in local storage, retrieve the array, find and delete the specified value
    //then resave the array to storage
    if (localStorage.getItem("favourites") != null) {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        var favourites = "";
        for (i = 0; i < arr.length; i++) {
            if (arr[i] != id) {
                favourites += arr[i] + " ";
            }
        }
        localStorage.setItem("favourites", favourites);
    }
}

function checkIfFavourited() {

    //check local storage is populated
    if (localStorage.getItem("favourites") != null) {
        var retrievedData = localStorage.getItem("favourites");
        var arr = retrievedData.split(" ");
        
        //if takeaway is saved hide favourite link, else hide the delete link
        if (arr.includes(id)) {
            var favouriteLink = document.getElementById("favourite");
            favouriteLink.style.display = "none";
        }
        else {
            var deleteLink = document.getElementById("delete");
            deleteLink.style.display = "none";
        }
    }
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

//function called on page load, load the takeaway's details and check if takeaway is saved or not
function init() {
    loadTakeaways("./json/takeaways.json", takeawayDetails);
    checkIfFavourited();
}

//makes sure dom is loaded before proceeding with any JavaScript
google.maps.event.addDomListener(window, "load", init);

//listeners to run save and delete takeaway functionality
document.getElementById("favourite").onclick = function () { saveTakeaway() };
document.getElementById("delete").onclick = function () { deleteTakeaway() };




