let img = null;
let imgcanv = null;
let imgB = null;
let imgG = null;
let imgR = null;
let imgGip = null;

function loadImage(){
    let fileinput = document.getElementById('fileinput');
    imgcanv = document.getElementById('imgcanv');
    img = new SimpleImage(fileinput);
    imgR = new SimpleImage(fileinput);
    imgB = new SimpleImage(fileinput);
    imgG = new SimpleImage(fileinput);
    imgGip = new SimpleImage(fileinput);

    img.drawTo(imgcanv);
}

function doGray() {
    clearCanvas();
    const canv = document.getElementById('imgcanv');
    for(let pixel of imgG.values()){
        const avr = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avr);
        pixel.setGreen(avr);
        pixel.setBlue(avr);
    }
    imgG.drawTo(canv);
}

function doBlue(){
    clearCanvas();
    for(let pixel of imgB.values()){
        pixel.setBlue(255);
    }
    imgB.drawTo(imgcanv);
}

function doRed(){
    clearCanvas();
    for(let pixel of imgR.values()){
        const avr = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if(avr < 128){
            pixel.setRed(2 * avr);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen(2 * avr - 255);
            pixel.setBlue(2 * avr - 255);
        }
        
    }
    imgR.drawTo(imgcanv);
}

function doFilter(){
    clearCanvas();
    const width = imgcanv.width;
    const height = imgcanv.height;
    for(let pixel of imgGip.values()){
        let x = pixel.getX();
        let y = pixel.getY();
        let avr = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if(y + x < width - 200 &&  y + x > height + 200){
            pixel.setRed(255);
        } else if (y + x < height){
            if(avr < 128){
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avr);
            } else {
                pixel.setRed(2 * avr - 255);
                pixel.setGreen(2 * avr - 255);
                pixel.setBlue(255);
            }
        } else if (y + x > width){
            if(avr < 128){
                pixel.setRed(2 * avr);
                pixel.setGreen(2 * avr);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avr - 255);
            }
        }
        
    }
    imgGip.drawTo(imgcanv);
}

function clearCanvas(){
    const canv = document.getElementById('imgcanv');
    const ctx = canv.getContext('2d');

    ctx.clearRect(0, 0, canv.width, canv.height);
}

function reset() {
    clearCanvas();
    img.drawTo(imgcanv);
}
