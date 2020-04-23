const canvas =  document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const save = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

canvas.witdh = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.witdh, canvas.height)
ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

const onMouseMove = (event) => {
    const {offsetX: x,offsetY: y} = event

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke()
    }
}

const stopPainting = () => {
    painting =false
}

const startPainting = () => {
    painting = true
}

const handleColorClick = (event) => {
    const {target:{style:{backgroundColor:color}}} = event
    ctx.strokeStyle = color
    ctx.fillStyle = ctx.strokeStyle
}

const handleRangeChange = (event) => {
    const {target:{value:size}}=event
    ctx.lineWidth = size
}

const handleModeClick = () => {
    if (filling) {
        filling = false
        mode.innerText ="Fill"
    } else {
        filling = true
        mode.innerText = "Paint"
    }
}

const handleClick = () => {
    if (filling) {
        ctx.fillRect(0, 0, canvas.witdh, canvas.height)
    }
}

const handleContextMenu = (event) => {
    event.preventDefault();
}

const handleSaveClick = () => {
    const img = canvas.toDataURL()
    const link = document.createElement("a")
    link.href = img
    link.download = "PaingJS"
    link.click();
    
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("contextmenu", handleContextMenu)
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (save) {
    save.addEventListener("click", handleSaveClick)
}