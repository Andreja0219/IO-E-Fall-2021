
// This sketch was written by Andreja Morrison, Nov.2021

// This was created using p5. js examples from:

// https://p5js.org/reference/#/p5/brightness
// https://p5js.org/reference/#/p5/background
// https://p5js.org/reference/#/p5/map
// https://p5js.org/reference/#/p5/saturation
// https://editor.p5js.org/jarivkin/sketches/--Hnpm6_6
// https://p5js.org/examples/control-conditionals-1.html

// The arduino sketch that corresponds with this is subway_install.ino

// This code is adapted from Douglas Whitton's "week6-3circles-3sounds" and "Week6-loadSounds"
// from Interactive Obects and Environments.

let bg = 0;
let newCol;

let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let val0 = 0, val1 = 0, val2 = 0;


//SETUP

function setup() {

    createCanvas(windowWidth, windowHeight);
   
    } 


 //SERIAL MONITOR

  serial = new p5.SerialPort();

  serial.list();
  console.log("serial.list()   ", serial.list());

  serial.open("/dev/tty.usbmodem14301");
 
  serial.on('connected', serverConnected);

  serial.on('list', gotList);
 
  serial.on('data', gotData);

  serial.on('error', gotError);
 
  serial.on('open', gotOpen);
  

  //SERVER

function serverConnected() {
  console.log("Connected to Server");
}


//PORTS

function gotList(thelist) {
  console.log("List of Serial Ports:");
 
  for (var i = 0; i < thelist.length; i++) {

    console.log(i + " " + thelist[i]);
  }
}


function gotOpen() {
  console.log("Serial Port is Open");
}


function gotError(theerror) {
  console.log(theerror);
}


//ARDUNIO DATA

function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  
  val0 = splitter[0];                 //put the first sensor's data into a variable
  val1 = splitter[1];
  val2 = splitter[2];

console.log('temp', val0);
console.log('humid', val1);
console.log('light', val2);


}

function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


//DRAW

function draw() {
  
   

    if (val0 < 20){
        let from = color(128,235,255);
       let to = color(15,46,67);
       bg = map(val2, 100, 0, 0, 1);
        newCol = lerpColor(from, to, bg); 
    } 
    else if (val0 < 10) {
       let  from = color(199,226,255);
       let  to = color(1,22,47);
       bg = map(val2, 100, 0, 0, 1);
        newCol = lerpColor(from, to, bg);
    } 
    else if (val0 < 0){
        let from = color(214,234,252);
        let to = color(0,24,44);
        bg = map(val2, 100, 0, 0, 1);
        newCol = lerpColor(from, to, bg);
    }
    
    if (val1 > 70){
        let from = color(175,186,195);
       let to = color(55,60,65);
       bg = map(val2, 100, 0, 0, 1);
        newCol = lerpColor(from, to, bg);
    } else {
      let from = color(128,235,255);
     let to = color(15,46,67);
     bg = map(val2, 100, 0, 0, 1);
      newCol = lerpColor(from, to, bg); 
  } 
   

    background(newCol);
}

