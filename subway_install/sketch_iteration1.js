
// This sketch was written by Andreja Morrison, Nov.2021

// This was created using p5.js examples from:

// https://p5js.org/reference/#/p5/remove
// https://p5js.org/reference/#/p5/input
// https://p5js.org/reference/#/p5/text
// https://p5js.org/examples/dom-input-and-button.html
// https://flaviocopes.com/speech-synthesis-api/

// The arduino sketch that corresponds with this is sprint3.3.ino

// This code is adapted from Douglas Whitton's "week6-3circles-3sounds" and "Week6-loadSounds" as well as the posenet examples.
// from Interactive Obects and Environments.

let input, button, greeting;
let video;
let pose;

let skeleton;
let angle=0;
let movers = [];
// Initialize new SpeechSynthesisUtterance object
const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'en';
utterance.pitch = 1.5;
utterance.rate = 5;


let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let val0 = 0, val1 = 0;


function setup() {

    createCanvas(windowWidth, windowHeight);
       
  
    } 


///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem14201");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

 

////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  console.log("splitter[0]" + splitter[0]); 
  val0 = splitter[0];                 //put the first sensor's data into a variable
  val1 = splitter[1];

console.log('temp', val0);
console.log('humid', val1);
}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


  
function draw() {
 if (val0 < 20){ 
    background(255,0,255);
 }
 if (val1 < 30){
     background(255,255,10);
 }

  circleColour = color(255, 99, 71);
  circleColour.setAlpha(slider.value());
  fill(circleColour);

}

