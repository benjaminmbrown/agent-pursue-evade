
var pursuer;
var evader;


function setup() {
 createCanvas(640, 360);
 setFrameRate(30);
 pursuer = new Vehicle(width/4, height/4);
 evader = new Vehicle(width/2, height/2);



}

function draw(){
	background(255);
	var mouse = createVector(mouseX, mouseY);
	fill(127);
	stroke(200);
	strokeWeight(2);
	ellipse(mouse.x,mouse.y, 48,48);
	
	pursuer.pursue(evader);
	pursuer.boundaries();
	pursuer.update();
	pursuer.display();

	//evader.seek(mouse);
	evader.wander();
	evader.update();
	evader.display();

}
