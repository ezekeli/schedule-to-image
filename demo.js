function demo() {
}

demo.loadScript = (url, callback) => {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if(callback !== undefined){
        if (script.readyState){  //IE
            script.onreadystatechange = () => {
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
            }
        }
        } else {  //Others
            script.onload = () => { callback(); }
        }
    }

    script.src = url;
    document.querySelector("head").appendChild(script);
}

demo.createButton = () => {
    var popup = document.querySelector("#schedule_popup");
    if(popup !== null && popup.style.display !== "none") {
        var button = document.createElement('div');
        button.type = "button";
        button.className = "route_stops_directions_buttons";
        button.innerText = "Скачать";
        button.onclick = () =>  { (new ScheduleToImage()).run(); }
        document.querySelector(".schedules_header").appendChild(button);
    }
}

demo.run = () => {
    demo.loadScript("https://rawgit.com/ezekeli/eway/master/javascript/html2canvas.js");
    demo.loadScript("https://rawgit.com/ezekeli/eway/master/javascript/schedule-to-image.js", demo.createButton());
}
