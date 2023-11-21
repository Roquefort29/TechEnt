document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const canvasRect = canvas.getBoundingClientRect();
    let isDrawing = false;
    let drawingColor = "#00ff00"; // Default drawing color
    let eraserMode = false;

    const colorPicker = document.getElementById("colorPicker");
    const eraserButton = document.getElementById("eraserButton");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    colorPicker.addEventListener("input", changeColor);
    eraserButton.addEventListener("click", toggleEraser);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
    
        const mouseX = e.clientX - canvasRect.left;
        const mouseY = e.clientY - canvasRect.top;
    
        context.lineWidth = 5;
        context.lineCap = "round";
    
        if (eraserMode) {
            context.globalCompositeOperation = "destination-out";
            context.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
            context.fill();
        } else {
            context.globalCompositeOperation = "source-over";
            context.strokeStyle = drawingColor;
            context.lineTo(mouseX, mouseY);
            context.stroke();
            context.beginPath();
            context.moveTo(mouseX, mouseY);
        }
    }    

    function stopDrawing() {
        isDrawing = false;
        context.globalCompositeOperation = "source-over"; // Reset to default drawing mode
        context.beginPath();
    }

    function changeColor() {
        drawingColor = colorPicker.value;
    }

    function toggleEraser() {
        eraserMode = !eraserMode;
        eraserButton.classList.toggle("active", eraserMode);

        if (eraserMode) {
            drawingColor = "#ffffff"; // Set eraser color to white
        } else {
            drawingColor = colorPicker.value; // Reset to the selected drawing color
        }
    }
});
