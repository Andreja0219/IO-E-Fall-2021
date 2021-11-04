/* 
October 2021 - Andreja Morrison

This code is adapted from Douglas Whitton's "week6-3circles-3sounds" and "Week6-loadSounds" 
from Interactive Obects and Environments.

The Arduino file that's running is "sprint1.3"

Objective: 
- Use the button to pause song while pressed.
- Use the sound input to stop song if too loud.
- Use the potentiometer to change the opacity and direction of particles as well as play song.

Particle System Reference

https://p5js.org/examples/interaction-wavemaker.html


Music from Uppbeat (free for Creators!):
https://uppbeat.io/t/jonny-boyle/carefree-in-france
License code: EJBU8NVX09G9JYTP

La Vie En Rose - Edith Piaf
**RE: COPYRIGHT**
Under Canadian law, a musical work is copyrighted if its author is still 
living, or if the author died less than 50 years ago. If more than one author
created the work, copyright extends until 50 years after the death of the last
surviving author.

Music Copyright & Publishing FAQ | CMRRA https://www.cmrra.ca 

*/
let t = 0; // time variable

let song;
let song2;
let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;


function setup() {
  
  song = loadSound('assets/carefree-in-france-jonny-boyle-main-version-02-36-3286.mp3');
  song2 = loadSound('assets/Edith-Piaf-La-vie-en-rose.mp3');
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 0);

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
  serial.open("/dev/tty.usbmodem14101");
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

 
}
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
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 

if (diameter0 > 0){
  song2.stop();
} 

if (diameter2 > 500){
  song2.play();
} else {
  song2.stop();
}

if (diameter1 > 50){

  song2.stop();
  console.log("Too Loud!");
}

}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
  
  background(255,255,255);
  text(latestData, 10,10);
  textSize(10);
  noStroke();
  //console.log("diameter1  "  + diameter1);
//   ellipse(400, 400, diameter2, diameter2);
//   ellipseMode(RADIUS);




if (song2.isPlaying()){
  circleColour = color(131, 238, 255);
  circleColour.setAlpha(diameter1 + 10);
 fill(circleColour);
} else {
  circleColour = color(131, 238, 255);
  circleColour.setAlpha(diameter2);
 fill(circleColour);
}

// };



for (let x = 0; x <= width; x = x + 30) {
  for (let y = 0; y <= height; y = y + 30) {
    // starting point of each circle depends on mouse position
    const xAngle = map(diameter2, 0, width, -4 * PI, 4 * PI, true);
    const yAngle = map(diameter2, 0, height, -4 * PI, 4 * PI, true);
    // and also varies based on the particle's location
    const angle = xAngle * (x / width) + yAngle * (y / height);

    // each particle moves in a circle
    const myX = x + 20 * cos(2 * PI * t + angle);
    const myY = y + 20 * sin(2 * PI * t + angle);

    ellipse(myX, myY, 40); // draw particle
  }
}

t = t + 0.01; // update time


}




// function mousePressed() {
//   if (song.isPlaying()) {
//     // .isPlaying() returns a boolean
//     song.stop();
//     background(255, 0, 0);
//   } else {
//     song.play(diameter0);
//     background(0, 255, 0);
//   }};

  function mouseClicked(){
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
      console.log("getAudioContext().state" + getAudioContext().state);
    }
    };