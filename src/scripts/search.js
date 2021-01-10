        function ajax(url, callback){
            fetch(url).then(function(response){
                return response.json();
            }).then(function(json){
               callback(json) 
            });
        }

        function populateTakeawayList(takeaways){
            const takeawaysFragment = document.createDocumentFragment();
            takeaways.forEach(function(takeaway){
                const newLi=document.createElement("Li");
                const nameDiv=document.createElement("div");
                const foodDiv=document.createElement("div");
                const link=document.createElement("a");
                nameDiv.textContent=takeaway.name;
                foodDiv.textContent=takeaway.food_type;
                link.textContent="View";
                link.setAttribute("href","details.html?id="+takeaway.id);
                newLi.appendChild(nameDiv);
                newLi.appendChild(foodDiv);
                newLi.appendChild(link);
                takeawaysFragment.appendChild(newLi);
                const takeawayList=document.getElementById("takeawayList");
                takeawayList.appendChild(takeawaysFragment);
            });
        }

        function init(){
            ajax("./json/takeaways.json", populateTakeawayList);
        }

        init();

