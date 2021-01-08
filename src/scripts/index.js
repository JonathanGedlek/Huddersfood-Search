
        fetch("./json/takeaways.json").then(function(response){
            return response.json();
        }).then(function(json){
            var takeawayNames = "";
            const takeaways = json;
            takeaways.forEach(function(takeaway){
                takeawayNames += "<li>"+takeaway.name+"</li>"
            })
            document.getElementById('takeawayList').innerHTML = takeawayNames;
        });