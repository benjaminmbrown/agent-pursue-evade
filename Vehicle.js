var Vehicle = function(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxSpeed = 4;
    this.maxForce = 0.2;


    this.wanderRadius = 19;
    this.wanderDistance = 4;
    this.wanderCenter = 0;
    this.wanderAngle = 0;
    this.wanderForce = createVector();



    this.seek = function(target) {
        var desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.setAngle = function(vector, value) {
        vector.x = cos(value) * vector.mag();
        vector.y = sin(value) * vector.mag();

    }

    this.wander = function() {

        this.wanderCenter = this.velocity.copy();
        this.wanderCenter.setMag(1);
        this.wanderCenter.mult(this.wanderDistance);

        var angleChange = 3

        var displacement = createVector(0, -1);
        displacement.mult(this.wanderRadius);

        this.setAngle(displacement, this.wanderAngle);
        this.wanderAngle += random(-1, 1);

        this.wanderForce = this.wanderCenter.add(displacement);
        this.wanderForce.limit(this.maxForce);

        this.applyForce(this.wanderForce);

    }

        //inverse of seek 
    this.flee = function(target) {
            var desired = p5.Vector.sub(this.position, target);
            desired.setMag(1);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }

    this.pursue = function(target) {
        var lookahead = p5.Vector.dist(target,this.position)/this.maxSpeed;
        console.log(lookahead);
        var futurePosition = target.copy();
        console.log(futurePosition);
        //futureposittion = t.position + t.velocity * lookahead
        //var futurePosition = 

        var desired = p5.Vector.sub(futurePosition, this.position);
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
     
    }


    this.arrive = function(target) {
        var desired = p5.Vector.sub(target, this.position); //vector pointing FROM loc TO target
        var distance = desired.mag();
        //damping within 100 pixels


        if (distance < 100) {
            //set magnitude according to how close we are
            var scaledSpeed = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(scaledSpeed);
        } else { desired.setMag(this.maxSpeed) }

        //Steer - desired minus velocity

        var steer = p5.Vector.sub(desired, this.velocity); //steer = desired-velocity
        steer.limit(this.maxForce);
        this.applyForce(steer);


    }

    this.update = function() { //Standard Euler integration motion

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        //TODO: max force and speed vary based on life

    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.display = function() {
        var theta = this.velocity.heading() + PI / 2;
        console.log("heading:", this.velocity.heading());

        var wanderX = this.wanderRadius * cos(this.wanderTheta);
        var wanderY = this.wanderRadius * sin(this.wanderTheta);

        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);

        pop();



    }





}