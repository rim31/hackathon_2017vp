
var myHeadBand = new Headband({
	images:["https://i2.wp.com/www.deteched.com/wp-content/uploads/2017/09/843675.jpg?resize=1023.75%2C640", "https://sh-s7-live-s.legocdn.com/is/image/LEGOMKTG/red-brick--201606--gl--footer?$LegoBrick$", "https://vignette.wikia.nocookie.net/lego/images/6/69/Superman_%28Variant_1%29.png/revision/latest?cb=20141205044200", "https://img.crazylister.com/19248/images/1/lego.png?versionId=p8ZbQgQk7vwgq1gfy4BWPdIyo1lS3n6_&pid=852"],
	imagesPos:[{x: -25, y: -60, z: 3}, {x: 300, y: 90, z: 6}, {x: 150, y: 15, z: 9}, {x: 35, y: 30, z: 12}],
	imagesProp: [2, 2, 5, 2],
	cClass: "myCanvas",
});

myHeadBand.draw();
myHeadBand.canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(myHeadBand, evt);
	drawHeadband(myHeadBand, mousePos);
}, false);
myHeadBand.canvas.addEventListener('mouseout', function(evt) {
	drawHeadband(myHeadBand, {x: 0, y: 0});
}, false);

// canvas 2

var myHeadBand2 = new Headband({
	images:["missoni/fond.png", "missoni/panneau.png", "missoni/mannequin.png", "missoni/logo.png"],
	imagesPos:[{x: -22, y: -120, z: -2}, {x: -20, y: -125, z: 4}, {x: -20, y: -130, z: 6}, {x: 0, y: 30, z: 0}],
	imagesProp: [4, 4, 4, 1.3],
	cClass: "myCanvas2",
});

myHeadBand2.draw();
myHeadBand2.canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(myHeadBand2, evt);
	drawHeadband(myHeadBand2, mousePos);
}, false);
myHeadBand2.canvas.addEventListener('mouseout', function(evt) {
	drawHeadband(myHeadBand2, {x: 0, y: 0});
}, false);

// ==================================== //

function Headband(options){
    this.options = options;
    this.canvas = document.getElementById(options.cClass);
	this.ctx = this.canvas.getContext("2d");
	this.imagesPos = options.imagesPos;
	this.imagesProp = options.imagesProp;
  
    this.draw = async function(){
        this.images = [await addImageProcess(options.images[0]), await addImageProcess(options.images[1]), await addImageProcess(options.images[2]), await addImageProcess(options.images[3])];
        drawHeadband(this, {x: 0, y: 0});
    }
}


// ------------------------------------ //

function addImageProcess(src){
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawHeadband(hb, mousePos) {
	hb.ctx.clearRect(0, 0, hb.canvas.width, hb.canvas.height);
	hb.ctx.drawImage(hb.images[0], hb.imagesPos[0].x + mousePos.x/30*hb.imagesPos[0].z, hb.imagesPos[0].y + mousePos.y/30*hb.imagesPos[0].z, hb.images[0].naturalWidth/hb.imagesProp[0], hb.images[0].naturalHeight/hb.imagesProp[0]);
	hb.ctx.drawImage(hb.images[1], hb.imagesPos[1].x + mousePos.x/30*hb.imagesPos[1].z, hb.imagesPos[1].y + mousePos.y/30*hb.imagesPos[1].z, hb.images[1].naturalWidth/hb.imagesProp[1], hb.images[1].naturalHeight/hb.imagesProp[1]);
	hb.ctx.drawImage(hb.images[2], hb.imagesPos[2].x + mousePos.x/30*hb.imagesPos[2].z, hb.imagesPos[2].y + mousePos.y/30*hb.imagesPos[2].z, hb.images[2].naturalWidth/hb.imagesProp[2], hb.images[2].naturalHeight/hb.imagesProp[2]);
	hb.ctx.drawImage(hb.images[3], hb.imagesPos[3].x + mousePos.x/30*hb.imagesPos[3].z, hb.imagesPos[3].y + mousePos.y/30*hb.imagesPos[3].z, hb.images[3].naturalWidth/hb.imagesProp[3], hb.images[3].naturalHeight/hb.imagesProp[3]);
}

function getMousePos(hb, evt) {
	var rect = hb.canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left - (rect.right - rect.left)/2,
		y: evt.clientY - rect.top - (rect.bottom - rect.top)/2
	};
}