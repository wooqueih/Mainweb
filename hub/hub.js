/*function toDo() {
    var lis = document.getElementById("toDo").innerHTML;
    
}*/
function reqListener () {
    console.log(this.responseText);
}

var xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.addEventListener("load", reqListener)
xmlHttpReq.open("GET", "http://localhost:8080/to-do.json");
xmlHttpReq.send();

/*var json = JSON.parse(xmlHttpReq.responseText);
console.log(json);*/
