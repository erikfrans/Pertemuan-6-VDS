let judul;
let tombol;
let objek;
let jalan = false;
let gravForce;
let windForce
//bukti kehadiran didalam program tambahkan nama dan nim
function setup() {
  createCanvas(windowWidth, windowHeight);
  tombol = createButton('Start/Pause');
  tombol.position(50,130)
  objekPos = createVector(width/10,height/2);
  objekVel = createVector(1,0);
  objekAcc = createVector(0.1,0);
  objekMass = 15;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  gravForce = createVector(0, objek.mass*0.01);
  windForce = createVector(0.0001,0);
}

function draw() {
  background(200,220,200);
  judul = createElement('h1', 'Simulasi Hukum Newton')
  judul.position(50, 15)
  judul = createElement('h3', 'Nama : Erik Frans Setiawan')
  judul.position(50, 60)
  judul = createElement('h3', 'NIM : 122160067')
  judul.position(50, 85)
  objek.display();
  var Cd = 0.00001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  tombol.mousePressed(run);

  if (jalan){
    objek.update();
  } 
}

function run(){
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill(25,90,55);
    ellipse(this.location.x, this.location.y, 2*this.mass, 2*this.mass);
 }
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }
}