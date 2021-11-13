
// This sketch was written by Andreja Morrison, Nov.2021

// This was created using p5.js examples from:

// https://p5js.org/reference/#/p5/remove
// https://p5js.org/reference/#/p5/input
// https://p5js.org/reference/#/p5/text
// https://p5js.org/examples/dom-input-and-button.html
// https://flaviocopes.com/speech-synthesis-api/


let slider;
let input, button, greeting;
// Initialize new SpeechSynthesisUtterance object
const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'en';
utterance.pitch = 1.5;
utterance.rate = 5;
speechSynthesis.speak(utterance)

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, 1, 1, 0.1); //volume control
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


}

function draw() {
  background(255,255,255);

  //let val = slider.value();
  console.log(slider.value());
  let word = input.value();

  text(word, 200, 400, 1000, 1800);


}

function keyPressed() {
  if (keyCode === DELETE) {
    remove(input.value());
  } 
}



function greet() {
  utterance.text = input.value();
  input.value('');
  utterance.volume = slider.value();

  window.speechSynthesis.speak(utterance);
  

  console.log('story: ', utterance.text);
}
