const colorPicker = document.getElementById("colorpicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const retrievebutton = document.getElementById("retrieve");
const fontpicker = document.getElementById("fontpicker");
const ctx = canvas.getContext('2d');
let isDrawing=false;

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle=e.target.value;
    ctx.fillstyle=e.target.value;
    console.log(e,ctx);
})

canvas.addEventListener('mousedown',(e)=>{

    isDrawing=true;
    lastX=e.offsetX;
    lastY=e.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{

    if(isDrawing){

ctx.beginPath();
ctx.moveTo(lastX,lastY);
ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();

lastX=e.offsetX;
lastY=e.offsetY;

    }
   
})

canvas.addEventListener('mouseup',()=>{

    isDrawing=false;
})
canvasColor.addEventListener('input',(e)=>{
    ctx.fillStyle=e.target.value;
    // ctx.fillstyle=colorPicker.value;
    console.log("ctx.fillstyle",colorPicker.value,e.target.value)
   ctx.fillRect(0,0,800,500);
// console.log(e,ctx);
})


fontpicker.addEventListener('change',(e)=>{
ctx.lineWidth=e.target.value;

})
clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.width,canvas.clientHeight);

})
saveButton.addEventListener('click',(e)=>{

    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link=document.createElement('a');
    link.download='my-canvas.png';
    link.href=canvas.toDataURL();
    link.click();
})

retrievebutton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
})



