const cvClass = document.getElementsByClassName("cv"); //cv = canvas
var allCtx = [];
for(let i = 0; i < cvClass.length; i++){
    allCtx[i] = cvClass.item(i).getContext("2d");
} var coordSys = {
    cv : undefined,
    canvasSelector : function(num){cv = cvClass.item(num);ctx = allCtx[num];},
    numLine : function(xmax, xmin, ymax, ymin, linex, liney){
        y = Math.abs(ymax) + Math.abs(ymin);
        x = Math.abs(xmax) + Math.abs(xmin);
    }
};