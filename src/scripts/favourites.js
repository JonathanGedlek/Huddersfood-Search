function loadTakeaways(url, callback) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        callback(json)
    });
}

function populateTakeawayList(takeaways) {
    const takeawaysFragment = document.createDocumentFragment();
    const savedTakeaways = localStorage.getItem("favourites").split(" ");
    for(i=0; i<savedTakeaways.length;i++){
        savedTakeaways[i] = parseInt(savedTakeaways[i]);
        console.log(savedTakeaways);
    }
    takeaways.forEach(function (takeaway) {
        if (savedTakeaways.includes(takeaway.id)) {
            const newLi = document.createElement("Li");
            const nameDiv = document.createElement("div");
            const foodDiv = document.createElement("div");
            const link = document.createElement("a");
            nameDiv.textContent = takeaway.name;
            foodDiv.textContent = takeaway.food_type;
            link.textContent = "View";
            link.setAttribute("href", "details.html?id=" + takeaway.id);
            newLi.appendChild(nameDiv);
            newLi.appendChild(foodDiv);
            newLi.appendChild(link);
            takeawaysFragment.appendChild(newLi);
            const takeawayList = document.getElementById("takeawayList");
            takeawayList.appendChild(takeawaysFragment);
        }
    });
}

function init() {
    loadTakeaways("./json/takeaways.json", populateTakeawayList);
}

init();


