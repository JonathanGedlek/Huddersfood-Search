let takeawayJSON;

function loadTakeaways(url, callback) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        takeawayJSON = json;
        callback(json)
    });
}

function searchTakeaways(){
    const takeawayList = document.getElementById("takeawayList");
    const searchStr = document.getElementById("search").value.toLowerCase();
    takeawayList.innerHTML = null;
    takeawayJSON.forEach(function (takeaway){
        if((takeaway.name).toLowerCase().includes(searchStr)||(takeaway.food_type).toLowerCase().includes(searchStr)){
            const takeawaysFragment = document.createDocumentFragment();
        
        const liDiv = document.createElement("div");
        const flexDiv = document.createElement("div");
        const txtDiv = document.createElement("div");
        const newImg = document.createElement("img");
        const newLi = document.createElement("Li");
        const nameDiv = document.createElement("div");
        const foodDiv = document.createElement("div");
        const link = document.createElement("a");
        nameDiv.textContent = takeaway.name;
        foodDiv.textContent = takeaway.food_type;
        link.textContent = "View";
        link.setAttribute("href", "details.html?id=" + takeaway.id);
        newImg.setAttribute("src", "./pictures/"+takeaway.logo);
        newImg.setAttribute("class", "takeawayLogo mr-3");
        newImg.setAttribute("alt", takeaway.name+" logo")
        flexDiv.setAttribute("class","d-flex flex-row mb-3 p-2 border border-dark rounded");
        liDiv.appendChild(newLi);
        newLi.appendChild(flexDiv);
        flexDiv.appendChild(newImg);
        flexDiv.appendChild(txtDiv);
        txtDiv.appendChild(nameDiv);
        txtDiv.appendChild(foodDiv);
        txtDiv.appendChild(link);
        takeawaysFragment.appendChild(liDiv);
        const takeawayList = document.getElementById("takeawayList");
        takeawayList.appendChild(takeawaysFragment);
    
        }
    });
}



function populateTakeawayList(takeaways) {
    const takeawaysFragment = document.createDocumentFragment();
    takeaways.forEach(function (takeaway) {
        const liDiv = document.createElement("div");
        const flexDiv = document.createElement("div");
        const txtDiv = document.createElement("div");
        const newImg = document.createElement("img");
        const newLi = document.createElement("Li");
        const nameDiv = document.createElement("div");
        const foodDiv = document.createElement("div");
        const link = document.createElement("a");
        nameDiv.textContent = takeaway.name;
        foodDiv.textContent = takeaway.food_type;
        link.textContent = "View";
        link.setAttribute("href", "details.html?id=" + takeaway.id);
        newImg.setAttribute("src", "./pictures/"+takeaway.logo);
        newImg.setAttribute("class", "takeawayLogo mr-3");
        newImg.setAttribute("alt", takeaway.name+" logo")
        flexDiv.setAttribute("class","d-flex flex-row mb-3 p-2 border border-dark rounded");
        liDiv.appendChild(newLi);
        newLi.appendChild(flexDiv);
        flexDiv.appendChild(newImg);
        flexDiv.appendChild(txtDiv);
        txtDiv.appendChild(nameDiv);
        txtDiv.appendChild(foodDiv);
        txtDiv.appendChild(link);
        takeawaysFragment.appendChild(liDiv);
        const takeawayList = document.getElementById("takeawayList");
        takeawayList.appendChild(takeawaysFragment);
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
    loadTakeaways("./json/takeaways.json", populateTakeawayList);
}

init();

var search = document.getElementById("search");

    search.addEventListener('keyup',function(){searchTakeaways();});

