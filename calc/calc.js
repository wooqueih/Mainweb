function calc(){ //calculate f(x) = ax+bx^c+d
    ctx.strokeStyle = "limegreen";
    let f = 0;
    for(let inputx = -x1; inputx <= x2; inputx++){
        ctx.beginPath();
        ctx.moveTo(canvas.width/x * (inputx + x1 - 1), canvas.height/y * (-f + y2));
        f = a*inputx+b*inputx**c+d;
        ctx.lineTo(canvas.width/x * (inputx + x1), canvas.height/y * (-f + y2));
        ctx.stroke();
        ctx.closePath();
    }
}

function numLine(){ //make the numberlines
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, numLineY);
    ctx.lineTo(canvas.width, numLineY);
    ctx.moveTo(numLineX, 0);
    ctx.lineTo(numLineX, canvas.height);
    ctx.stroke();
    ctx.font = '18px Turret Road';
    ctx.strokeText(x2, canvas.width - 45, numLineY - 5, 40);
    ctx.strokeText(0 - x1, 5, numLineY - 5);
    ctx.strokeText(y2, numLineX + 5, 20);
    ctx.strokeText(0 - y1, numLineX + 5, canvas.height - 5);
    ctx.closePath();
}

function bg() { //make the background squares
    ctx.strokeStyle = "lightgrey";
    if(y > 1000 || x > 1000){
        canvas.style.backgroundColor = "lightgrey";
    }
    else {
        canvas.style.backgroundColor = "white";
        ctx.beginPath();
        for(let n = 0; n < x; n++){
            ctx.moveTo(canvas.width/x*n, 0);
            ctx.lineTo(canvas.width/x*n, canvas.height);
        }
        for(let n = 0; n < y; n++){
            ctx.moveTo(0, canvas.height/y*n);
            ctx.lineTo(canvas.width, canvas.height/y*n);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

function juliaSet(steps, draw) { // calculates z = z²+c and returns the escape step as complexNum.escStep (-1 means no escape)
    if(draw == true) {
        ctx.fillStyle = "blue"
        ctx.strokeStyle = "blue"
        complexNum.escStep = -1;
        document.getElementById("escStepDispaly").innerHTML = "&nbspno escape";
        for(let n = 0; n <= steps; n++) {
            ctx.beginPath();
            ctx.moveTo(canvas.width/x * (complexNum.r + x1), canvas.height/y * (-complexNum.i + y2));
            //console.log("before", complexNum);
            i.sqr(complexNum.r, complexNum.i);
            //console.log("middle", complexNum);
            i.add(complexNum.r, complexNum.i, complexNum.cr, complexNum.ci);
            //console.log("after", complexNum);
            ctx.lineTo(canvas.width/x * (complexNum.r + x1), canvas.height/y * (-complexNum.i + y2));
            ctx.stroke();
            ctx.arc(canvas.width/x * (complexNum.r + x1), canvas.height/y * (-complexNum.i + y2), 5, 0, 2*Math.PI, false);
            ctx.fill();
            ctx.closePath();
            if(Math.sqrt(complexNum.r*complexNum.r + complexNum.i*complexNum.i) > 2) {
                complexNum.escStep = n;
                document.getElementById("escStepDispaly").innerHTML = "&nbspescaped at step " + complexNum.escStep;
                break;
            }
        }
        //debugger;
    } else if(draw == false) {
        complexNum.escStep = -1;
        for(let n = 0; n <= steps; n++) {
            if(Math.sqrt(complexNum.r*complexNum.r + complexNum.i*complexNum.i) > 2) {
                    complexNum.escStep = n;
                    break;
            }
            i.sqr(complexNum.r, complexNum.i);
            i.add(complexNum.r, complexNum.i, complexNum.cr, complexNum.ci);
        }
    }
    //console.log(complexNum)
}

function mandelbrot() { //mandelbrotset calculation
    for(let n = 0; n < canvas.width; n++) {
        //debugger;
        for(let n1 = 0; n1 < canvas.height; n1++) {
            complexNum.r = 0;
            complexNum.i = 0;
            complexNum.cr = 4/canvas.width*n-2;
            complexNum.ci = -(4/canvas.height*n1)+2;
            juliaSet(steps, false);
            ctx.beginPath();
            if(n == 400 && n1 == 400) {
                debugger;
                console.log("400", complexNum);
            }
            if(complexNum.escStep > -1) {
                ctx.fillStyle = 'rgb(50, 0, %s)'.replace('%s', complexNum.escStep);
                ctx.fillRect(n, n1, 1, 1);
            } else if(complexNum.escStep == -1) {
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.fillRect(n, n1, 1, 1);
                //console.log("mandelbrot", complexNum);
            } else {console.log("Error")}
            ctx.closePath();
        }
    }
}

function removeButt(k) {
    if(k == 1) {
        document.getElementById("THEBUTT").innerHTML = "";
        ctxList[2].font = '18px Turret Road';
        ctxList[2].strokeStyle = "black";
        ctxList[2].beginPath();
        ctxList[2].strokeText("please wait a moment...", 300, 400);
        ctxList[2].stroke();
        ctxList[2].closePath();
    } else {
        document.getElementById("THEBUTT").innerHTML = "!!HIT!!<br>!!ME!!";
    }
}

function hideShow() {
    let x = document.getElementById("Div1");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function updateCanvas(canvasNum){ //updates canvas and variables
    canvas = canvasList[canvasNum];
    ctx = ctxList[canvasNum];
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let n = 0; n < inputList.length; n++){
        if(inputList[n].value == "") {
            inputList[n].value = "0";
        }
    }
    x1List = [parseFloat(document.getElementById("x1").value), parseFloat(document.getElementById("c2x1").value), 2];
    x2List = [parseFloat(document.getElementById("x2").value), parseFloat(document.getElementById("c2x2").value), 2];
    y1List = [parseFloat(document.getElementById("y1").value), parseFloat(document.getElementById("c2y1").value), 2];
    y2List = [parseFloat(document.getElementById("y2").value), parseFloat(document.getElementById("c2y2").value), 2];
    x1 = x1List[canvasNum];
    x2 = x2List[canvasNum];
    y1 = y1List[canvasNum];
    y2 = y2List[canvasNum];
    a = parseFloat(document.getElementById("a").value);
    b = parseFloat(document.getElementById("b").value);
    c = parseFloat(document.getElementById("c").value);
    d = parseFloat(document.getElementById("d").value);
    complexNum.r = parseFloat(document.getElementById("c2r").value);
    complexNum.i = parseFloat(document.getElementById("c2i").value);
    complexNum.cr = parseFloat(document.getElementById("c2cr").value);
    complexNum.ci = parseFloat(document.getElementById("c2ci").value);
    steps = parseFloat(document.getElementById("steps").value);
    xList = [x1List[0] + x2List[0], x1List[1] + x2List[1], x1List[2] + x2List[2]];
    yList = [y1List[0] + y2List[0], y1List[1] + y2List[1], y1List[2] + y2List[2]];
    x = xList[canvasNum];
    y = yList[canvasNum];
    numLineY = canvas.height/y * y2;
    numLineX = canvas.width/x * x1;
    canvasList[2].width = parseFloat(document.getElementById("canvasSize").value);
    canvasList[2].height = parseFloat(document.getElementById("canvasSize").value);
    //debugger;
    if(canvasNum == 1) {
        bg();
        numLine();
        juliaSet(steps, true);
        console.log(complexNum.escStep)
    } else if(canvasNum == 2) {
        mandelbrot();
    } else {
        bg();
        numLine();
        calc();
    }
}

//startup
const inputList = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d"), document.getElementById("x1"), document.getElementById("x2"), document.getElementById("y1"), document.getElementById("y2"), document.getElementById("c2r"), document.getElementById("c2i"), document.getElementById("c2cr"), document.getElementById("c2ci"), document.getElementById("c2x1"), document.getElementById("c2x2"), document.getElementById("c2y1"), document.getElementById("c2y2"), document.getElementById("steps")];
const canvasList = [document.getElementById("canvas1"), document.getElementById("canvas2"), document.getElementById("canvas3")];
const ctxList = [canvasList[0].getContext("2d"), canvasList[1].getContext("2d"), canvasList[2].getContext("2d")];
var canvas;
var ctx;
var x1List;
var x2List;
var y1List;
var y2List;
var a;
var b;
var c;
var d;
var steps;
var xList;
var yList;
var numLineY;
var numLineX;
var complexNum = {
    r:0,
    i:0,
    cr:0,
    ci:0,
    escStep:0
};

var i = {
    x:0 ,
    y:0,
    z:0,
    cr:0,
    ci:0,
    angle:0,
    sqr: function(real, imaginary) {
        complexNum.r = real*real-imaginary*imaginary;
        complexNum.i = 2*real*imaginary;
    },
    add:function(real1, imaginary1, real2, imaginary2) {
        complexNum.r = real1+real2;
        complexNum.i = imaginary1+imaginary2;
    }
};
for(let n = 0; n < 2; n++) {
    updateCanvas(n);
}
