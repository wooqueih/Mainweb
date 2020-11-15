function reqJSON() {
    xmlHttpReq.addEventListener("load", reqListener)
    xmlHttpReq.open("GET", "http://localhost:8080/to-do.json");
    xmlHttpReq.send();
}

function reqListener () {
    console.log(this.responseText);
    var json = JSON.parse(xmlHttpReq.responseText);
    console.log(json)
    let str = json.wantToDo.toString();
    wantList.innerHTML = str.split(",").join("<br>");
}

var wantList = document.getElementById("wantToDo");
var haveList = document.getElementById("haveToDo");
var xmlHttpReq = new XMLHttpRequest();