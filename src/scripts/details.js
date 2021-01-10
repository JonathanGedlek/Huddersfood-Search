let map;

function ajax(url, callback){
    fetch(url).then(function(response){
        return response.json();
    }).then(function(json){
       callback(json) 
    });
}


function takeawayDetails(takeaway){
    const urlParams= new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const name=document.getElementById("name");
    const description=document.getElementById("description");
    const food_type=document.getElementById("food_type");
    const price_lvl=document.getElementById("price_lvl");
    const web_link=document.getElementById("web_link");
    const address=document.getElementById("address");
    name.textContent=takeaway[id].name;
    description.textContent=takeaway[id].description;
    food_type.textContent=takeaway[id].food_type;
    price_lvl.textContent=takeaway[id].price_lvl;
    web_link.textContent=takeaway[id].web_link;
    address.innerHTML=takeaway[id].address;
}



function init(){
    ajax("./json/takeaways.json", takeawayDetails);
    
}
init();



