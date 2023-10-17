/**
 * TextRaindrops
 * 
 * Start the words "the", "rain", and "is" falling down slowly, 
 * then the word "raining" falls down a lot, 
 * and finally the words "the rain is raining all around" slowly appear.
 * 
 */

let textDrops = [];
let startRain = false;
let opacity = 0;
let actTime = 600;
let timer = 0;

function setup() {
  createCanvas(windowHeight * 9 / 16, windowHeight);

  textFont('Georgia');

  // the words "the", "rain", and "is"
  textDrops.push(new TextDrop("the", 0));
  textDrops[0].x = width * 0.2;
  textDrops.push(new TextDrop("rain", 0));
  textDrops[1].x = width * 0.5;
  textDrops.push(new TextDrop("is", 0));
  textDrops[2].x = width * 0.8;
}

function draw() {
  timer++;
  background(249, 242, 224, 140);

  // Start the words "the", "rain", and "is" falling down slowly.
  for (let i = 0; i < textDrops.length; i++) {
    textDrops[i].show();
    if (textDrops[i].disapTimer < 0) {
      textDrops.splice(i, 1);
    }
  }

  if (textDrops.length == 0) {
    startRain = true;
  }

  if (startRain && timer < actTime) {
    if (random(1) < 0.4) {
      textDrops.push(new TextDrop("raining", random(2, 6)));
    }
  }

  // Finally the words "the rain is raining all around" slowly appear.
  if (timer >= actTime) {
    if (opacity < 255) {
      opacity++;
    }
    noStroke();
    fill(0, opacity);
    textSize(width / 25);
    text("The rain is raining all around", width * 0.25, height * 0.32);
    text("It falls on field and tree,", width * 0.25, height * 0.39);
    text("It rains on the umbrellas here, ", width * 0.25, height * 0.46);
    text("And on the ships at sea. ", width * 0.25, height * 0.53);
    textSize(width / 30);
    text("-", width * 0.50, height * 0.63);
    text("Robert", width * 0.54, height * 0.63);
    text("Louis", width * 0.54, height * 0.66);
    text("Stevenson", width * 0.54, height * 0.69);
  }

  // box
  noFill();
  stroke(0);
  strokeWeight(width / 80);
  rect(0, 0, width, height);
}

class TextDrop {
  constructor(_str, _vel) {
    this.str = _str;
    this.strs = split(this.str, '');
    this.x = random(width);
    this.y = random(0, height * 0.20);
    // this.endY = random(height * 0.70, height * 0.99);  // final destination
    this.endY = height * 0.98;
    this.vel = _vel;
    this.disapTimer = random(10, 30);
    this.direction = random(1);
  }

  // move the text drop
  move() {
    if (this.y < this.endY) {
      this.vel += 0.03;
      this.y += this.vel;
    } else {  // It's starting to disappear
      this.disapTimer--;
    }
  }

  show() {
    this.move();

    noStroke();
    fill(0, 80, 164);
    textSize(width / 14);

    push();
    textAlign(RIGHT, CENTER);
    translate(this.x, this.y);
    if (this.y < this.endY) { // The end point has not been reached
      push();
      rotate(PI / 2);
      text(this.str, 0, 0);
      pop();
    } else {
      fill(0, 80, 164, 255 - (60 - this.disapTimer) * 3);
      let radius = width * 0.15;
      if (this.direction < 0.5) {
        translate(radius, radius * 0.3);
      } else {
        translate(-radius, radius * 0.3);
      }
      // circle words
      for (let i = 0; i < this.strs.length; i++) {
        let ni = this.strs.length - 1 - i;

        push();
        if (this.direction < 0.5) {
          rotate(PI / 18 * i);
          translate(-radius, -radius * 0.3);
          push();
          rotate(-PI / 2);
        } else {
          rotate(-PI / 18 * i);
          translate(radius, -radius * 0.3);
          push();
          rotate(PI / 2);
        }
        text(this.strs[ni], 0, 0);
        pop();
        pop();
      }
    }
    pop();
  }
}








