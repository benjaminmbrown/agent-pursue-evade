
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
	
	fill(127);
	stroke(200);
	strokeWeight(2);
	
	
	pursuer.pursue(evader.position);
	pursuer.update();
	pursuer.display();

	evader.wander();
	evader.update();
	evader.display();

}
