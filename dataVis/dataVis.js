const cvClass = document.getElementsByClassName("cv"); //cv = canvas
var allCtx = [];
for(let i = 0; i < cvClass.length; i++){
    allCtx[i] = cvClass.item(i).getContext("2d");
} var coordSys = {
    cv : undefined,
    canvasSelector : function(num){cv = cvClass.item(num);ctx = allCtx[num];},
    numLine : function(xmax, xmin, ymax, ymin){
        y = Math.abs(ymax) + Math.abs(ymin);
        x = Math.abs(xmax) + Math.abs(xmin);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, y/2);
        ctx.lineTo(cv.width, y/2);
        ctx.moveTo(x/2, 0);
        ctx.lineTo(x/2, cv.height);
        ctx.stroke();
        ctx.closePath();
    }
};
coordSys.canvasSelector(0);
coordSys.numLine();