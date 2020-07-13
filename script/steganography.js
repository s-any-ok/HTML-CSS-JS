let hideImg = null;
let hideInImg = null;
let hideImgCanv = null;
let hideInImgCanv = null;


function loadImgToHide() {
    let hideInput = document.getElementById('hide');
    hideImgCanv = document.getElementById('hideCanv');

    hideImg = new SimpleImage(hideInput);;
    hideImg.drawTo(hideImgCanv);
}

function loadImgToHideIn() {
    let hideInInput = document.getElementById('inThis');
    hideInImgCanv = document.getElementById('inThisCanv');

    hideInImg = new SimpleImage(hideInInput);;
    hideInImg.drawTo(hideInImgCanv);
}

function clearBits(pixVal) {
    return Math.floor(pixVal/16)*16;
}

function chop2hide(image){
    for(let px of image.values()){
        px.setRed(clearBits(px.getRed()));
        px.setGreen(clearBits(px.getGreen()));
        px.setBlue(clearBits(px.getBlue()));
    }
    return image;
}

function shift(image){
    for(let px of image.values()){
        px.setRed(clearBits(px.getRed())/16);
        px.setGreen(clearBits(px.getGreen())/16);
        px.setBlue(clearBits(px.getBlue())/16);
    }
    return image;
}

function combine(hide, inThis){

    let result = new SimpleImage(inThis.getWidth(), inThis.getHeight());

    for(let px of result.values()){
        let x = px.getX();
        let y = px.getY();

        let inThisPx = inThis.getPixel(x, y);
        let hidePx = hide.getPixel(x, y);

        px.setRed(inThisPx.getRed() + hidePx.getRed());
        px.setGreen(inThisPx.getGreen() + hidePx.getGreen());
        px.setBlue(inThisPx.getBlue() + hidePx.getBlue());
    }
    return result;
}

function hide() {
    const hide = shift(hideImg);
    const inThis = chop2hide(hideInImg);

    const output = combine(hide, inThis);
    //inThis.drawTo(hideInImgCanv);
    output.drawTo(hideImgCanv);
}