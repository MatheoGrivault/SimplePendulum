let origin = [0, 50];
let angle = 0;
let velocity = 0;
let acceleration = 0;

let xList = [];
let yList = [];

function setup(){
    angle = HALF_PI;
    origin[0] = windowWidth/4;

    massSlider = document.getElementById("massSlider");
    lengthSlider = document.getElementById("lengthSlider");
    dampingSlider = document.getElementById("dampingSlider");

    canvas = createCanvas(windowWidth-10, windowHeight-350);
    canvas.parent("canvasParent");
}

function draw(){
    document.getElementById("massValue").innerText = massSlider.value;
    document.getElementById("lengthValue").innerText = lengthSlider.value;
    document.getElementById("dampingValue").innerText = dampingSlider.value/2;

    background(255);
    stroke(0);

    let length = lengthSlider.value;
    let x = origin[0] + length * sin(angle);
    let y = origin[1] + length * cos(angle);

    acceleration = -10 / massSlider.value / length * sin(angle);
    velocity += acceleration;
    angle += velocity;
    velocity *= 1-dampingSlider.value/200;

    line(origin[0], origin[1], x, y);
    circle(x, y, 20);

    xList.unshift(x);
    yList.unshift(y);

    if(xList.length >= 550) xList.pop();
    if(yList.length >= 1000) yList.pop();

    beginShape();
    noFill();
    for(let i = 0; i < xList.length; i++){
        vertex(xList[i], i + 400);
    }
    endShape();

    beginShape();
    for(let i = 0; i < yList.length; i++){
        vertex(windowWidth/4 + i + 400, yList[i]);
    }
    endShape();

    stroke(190);
    line(x, y, x, 400);
    line(x, y, windowWidth/4 + 400, y);
}

function windowResized() {
    resizeCanvas(windowWidth-10, windowHeight-350);
}