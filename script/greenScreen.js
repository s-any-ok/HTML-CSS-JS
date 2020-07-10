let fgimg = null;
let bgimg = null;
let foreCanv = null;
let backCanv = null;

function loadForeImg(){
    let foreInput = document.getElementById('foreInput');
    foreCanv = document.getElementById('fore');

    fgimg = new SimpleImage(foreInput);;
    fgimg.drawTo(foreCanv);
}

function loadBackImg(){
    let backInput = document.getElementById('backInput');
    backCanv = document.getElementById('back');

    bgimg = new SimpleImage(backInput);;
    bgimg.drawTo(backCanv);
}

function doGreenScreen(){
    if(fgimg == null || ! fgimg.complete()) {
        alert('foreground not loaded');
        return
    }
    if(bgimg == null || ! bgimg.complete()) {
        alert('background not loaded');
        return
    }
    clearCanvases();

    let output = new SimpleImage(fgimg.getWidth(), fgimg.getHeight());

    for(let pixel of fgimg.values()){
        let x = pixel.getX();
        let y = pixel.getY();
        if(pixel.getGreen() >= 240){
            let bgPixel = bgimg.getPixel(x, y);
            output.setPixel(x, y, bgPixel);
        } else {
            output.setPixel(x, y, pixel);
        }
    }
    output.drawTo(foreCanv);

}

function clearCanvases(){
    const ctxFore = foreCanv.getContext('2d');
    const ctxBack = backCanv.getContext('2d');
    ctxFore.clearRect(0, 0, foreCanv.width, foreCanv.height);
    ctxBack.clearRect(0, 0, backCanv.width, backCanv.height);
}