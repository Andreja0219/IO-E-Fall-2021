//Grab body part x,y locations from Posenet, put into an array, call a function to draw those points, to make trails   

let slider;
let video;
let pose;
//let img1;
//let img2;
let skeleton;
let angle=0;
let movers = [];
let liquid;
let t = 0;


function setup(){
   //b = new Ball();
/////////////////////////////////send to pnet 
colorMode(HSB, 255);
slider = createSlider(0, 255, 127);
frameRate(20);     
createCanvas(640, 480);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
//img1 = loadImage('images/hand2.svg');
//img2 = loadImage('images/face.svg');    
video.hide(); 
    
/////////////////////////////////
    
    
ellipseMode(CENTER);  
angleMode(DEGREES);
    
    
}
////////////////////////////////////////////

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    //console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 

//////////////////////////////////////////////////

// translate(240, 0, 0);
//   push();
//   rotateZ(frameCount * 0.01);
//   rotateX(frameCount * 0.01);
//   rotateY(frameCount * 0.01);
//   box(70, 70, 70);
//   pop();



function draw(){
   
////////////////////////////////////////////////
image(video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
filter(THRESHOLD,0);    

    if(pose){

    fill(slider.value(), 255, 255, 127);

        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
    ellipse(pose.nose.x, pose.nose.y, d*3);
    
        let v = createVector(pose.nose.x,pose.nose.y);
        
       

   
    //////////////////////////////////////////////////////////////    
        for(let i=0; i < pose.keypoints.length;i++){
    //for(let i=0; i < 5;i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    //push();
    //console.log("keypoints");
    //translate(x,y);    
     //rotate(angle);   
    //fill(0,255,0);
    ellipse(x,y,25,25);
    //angle+=0.01;  
        
        //pop();
    //ellipse(x,y,120,120);
      //box(x,y,50);  
        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y,b.position.x, b.position.y );
        fill(127);
        //rect((a.position.x)/2, (a.position.y)/2,(b.position.x)/2, (b.position.y)/2 );
         //rect(a.position.x,b.position.y,10,10);
        } 
        for (let r = 0; r <= width; r = r + 30) {
            for (let n = 0; n <= height; n = n + 30) {
              // starting point of each circle depends on mouse position
              const xAngle = map(x, 0, width, -4 * PI, 4 * PI, true);
              const yAngle = map(y, 0, height, -4 * PI, 4 * PI, true);
              // and also varies based on the particle's location
              const angle = xAngle * (r / width) + yAngle * (n / height);
        
              // each particle moves in a circle
              const myX = r + 20 * cos(2 * PI * t + angle);
              const myY = n + 20 * sin(2 * PI * t + angle);
        
              ellipse(myX, myY, 10); // draw particle
            }
          }
        
          t = t + 0.01; // update time
        }
           
    }

    
}  
    




    

// function drawNoseSpace(x,y){
//         //fill(0,0,255);
//         ellipse(x, y,100);
//         //console.log("drawHeadSpace " + x);
//     } 
//     function drawArmSpace(x,y){
//         //fill(0,0,255);
//         ellipse(x, y,100);
//         //console.log("drawHeadSpace " + x);
//     } 
/////////////////////////////////////////////////////////////