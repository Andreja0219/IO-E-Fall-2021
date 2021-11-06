// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let img;
let img2;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  img = loadImage('images/clown_face.png');
  img2 = loadImage('images/balloon.png');

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
  
}

function draw() {
  image(video, 0, 0, width, height);
  filter(INVERT);
  strokeWeight(2);


  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

    // Create a pink ellipse for the nose
    //fill(213, 0, 143);
    const nose = pose.nose;
    image(img, nose.x - 220, nose.y - 325, 450,450);

    // Create a yellow ellipse for the right eye
    fill(255, 0,0);
    const rightEye = pose.rightEye;
    ellipse(rightEye.x, rightEye.y, 20, 20);

    // Create a yellow ellipse for the right eye
    fill(255, 0, 0);
    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 20, 20);
      

    fill(0,255,0);
      const rightWrist = pose.rightWrist;
    image(img2, rightWrist.x - 200, rightWrist.y -200, 200, 400 );  
  }
}