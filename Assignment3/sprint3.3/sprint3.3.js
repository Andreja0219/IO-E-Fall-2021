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


let slider;
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
let diameter0 = 0, diameter1 = 0, diameter2 = 0;


function setup() {

    frameRate(20);     
    createCanvas(windowWidth, windowHeight);
       
    video = createCapture(VIDEO);
    video.size(width,height);    
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses) 
      
    video.hide(); 
        
        
    ellipseMode(CENTER);  
    angleMode(DEGREES);


    function modelLoaded(){
        console.log("modelLoaded function has been called so this work!!!!");
    };
    
    
    
    function gotPoses(poses){
      
        if( poses.length > 0 ){
            pose = poses[0].pose;
            skeleton = poses[0].skeleton; 
        } 
        
    } 

  slider = createSlider(0,100,diameter2,1); //volume control
  slider.position(10, 10);
  slider.style('width', '800px');
 

  input = createInput();
  input.position(20, 65);
  input.size(1000,100);

  button = createButton('speak');
  button.position(input.x + 947, + input.y + 100);
  button.mousePressed(greet);

  greeting = createElement('h2', 'tell me a story and press speak to hear it out loud!');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);

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
 
slider.value(diameter2);

console.log(slider.value());

}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


  
function draw() {
//   background(255,255,255);

  //let val = slider.value();
  console.log(slider.value());
  let word = input.value();
  let story = word.split('');
  
  circleColour = color(255, 99, 71);
  circleColour.setAlpha(slider.value());
  fill(circleColour);
  image(video, 0, 0,width,height);
  
filter(THRESHOLD,0);    
// text(word, 200,200,1000,1000);
    if(pose){

    fill(circleColour);

        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
   
    ellipse(pose.nose.x, pose.nose.y, d*3);
    text(word,pose.nose.x , pose.nose.y + 100);
   

        let v = createVector(pose.nose.x,pose.nose.y);
        
        for(let i=0; i < pose.keypoints.length;i++){
 
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    

        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(1);
        stroke('#fae');
        line( a.position.x, a.position.y,b.position.x, b.position.y );
    
        for (let i = 0; i < story.length; i++) {
            text(story[i],x,y);
            stroke(1);
            text(story[i], pose.rightEye.x, pose.rightEye.y);
            text(story[i], pose.leftEye.x, pose.leftEye.y);
            
        }

        } 

        }
           
    }

}




function keyPressed() {
  if (keyCode === DELETE) {
    remove(input.value());
  } else if (keyCode === ESCAPE) {
    console.log(utterance.volume);
  } else if (keyCode === RETURN) {
      greet();
  }
}


function greet() {
  utterance.text = input.value();
  input.value('');

  utterance.volume = (slider.value()/100);

  window.speechSynthesis.speak(utterance);

  console.log('story: ', utterance.text);

}






    




    

