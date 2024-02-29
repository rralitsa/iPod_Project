let sound;
let sound2;
let img;
let bestofboth;
let isPlaying = false; // track whether the song is currently playing
let album1;
let album2;
let song1; 
let song2; 
let currentAlbum = 0;

function preload() {
  sound = loadSound('powerOn.mp3');
  sound2 = loadSound('powerDown.mp3');
  bestofboth = loadSound('The Best of Both Worlds.mp3');
  img = loadImage('tracklist.png');
  album1 = loadImage('1albumcover.png');
  album2 = loadImage('2albumcover.png');
  song1 = loadSound('1GGT.mp3');
  song2 = loadSound('2OIM.mp3');
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  noStroke();
  
  image(img, 500, 50, 250, 250);
  iPod();
  Navigation(300, 450, 150, 80, 50);
  albumCovers(); 
  Rewind();
  Skip();
}

function mouseClicked() {
  if (mouseX >= 500 && mouseX <= 750 && mouseY >= 50 && mouseY <= 300) {
    if (!isPlaying) {
      bestofboth.play(); // play the song if it's not already playing
      isPlaying = true;
    } else {
      bestofboth.pause(); // pause the song if it's already playing
      isPlaying = false;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) { // space bar
    if (currentAlbum === 1) { 
      if (song1.isPlaying()) {
        song1.pause(); 
      } else {
        song1.play(); 
      }
    } else if (currentAlbum === 2) { 
      if (song2.isPlaying()) {
        song2.pause(); 
      } else {
        song2.play();
      }
    }
  } else if (keyCode === UP_ARROW) {
    sound.play();
    currentAlbum = 1;
    albumCovers.album1 = true;
    song1.play();
    if (song2.isPlaying()) {
      song2.pause();
    }
  } else if (keyCode === DOWN_ARROW) {
    sound2.play();
    currentAlbum = 0;
    albumCovers.album1 = true;
    if (song1.isPlaying()) {
      song1.pause();
    }
    // stop any currently playing songs
    if (song1.isPlaying()) {
      song1.stop();
    }
    if (song2.isPlaying()) {
      song2.stop();
    }
  } else if (keyCode === RIGHT_ARROW && !song2.isPlaying()) {
    song1.pause();
    currentAlbum = 2;
    albumCovers.album2 = true;
    song2.play();
    if (song1.isPlaying()) {
      song1.pause();
    }
  } else if (keyCode === LEFT_ARROW && !song1.isPlaying()) {
    currentAlbum = 1;
    albumCovers.album1 = true;
    song1.play();
    if (song2.isPlaying()) {
      song2.pause();
    }
  }
}

function Navigation(x, y, middleDiameter, innerDiameter) {
  fill(255);
  ellipse(x, y, middleDiameter);
  fill('hotpink');
  ellipse(x, y, innerDiameter);
}

function Rewind() {
  fill(200);
  triangle(300 - 70, 450, 300 - 50, 430, 300 - 50, 470);
}

function Skip() {
  fill(200);
  triangle(300 + 70, 450, 300 + 50, 430, 300 + 50, 470);
}

function iPod() {
  fill('hotpink');
  rect(200, 200, 200, 350);
}

function albumCovers() {
  fill(255);
  square(222, 210, 155, 5);

  if (currentAlbum === 1) {
    image(album1, 222, 210, 155, 155);
  } else if (currentAlbum === 2) {
    image(album2, 222, 210, 155, 155);
  } 
}