var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*.75;

var c = canvas.getContext('2d');

var mouse = {
	x:undefined,
	y:undefined
}

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight*.75;
	emit();
})

var distance = 15;
var interactDistance = 100;
var growSpeed = .2;
var shrinkSpeed = .1;
var normSize = 2;
var maxSize = 7;

var colorArray = [
	'#312566',
	'#7358F2',
	'#5540B2',
	'#43338C',
	'#4F3CA6']


function Dot(x,y,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (((mouse.x-this.x) **2+(mouse.y-this.y)**2)<interactDistance**2 ) {
			if (this.radius < maxSize * (1-(Math.sqrt((mouse.x-this.x) **2+(mouse.y-this.y)**2) / interactDistance))) {
				this.radius += growSpeed;
			}
		} else if (this.radius > normSize ) {
			this.radius -= shrinkSpeed;
		}
		this.draw();
	}
	
}

var dotArray = [];

function emit() {
	dotArray = [];

	for (var i = normSize; i < innerWidth; i = i + distance) {
		for (var j = normSize; j < innerHeight; j = j + distance) {
			dotArray.push(new Dot(i,j,normSize));
		}
	}
}

emit();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for (var i = 0; i < dotArray.length; i++){
		dotArray[i].update();
	}
}

animate();
