function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.move = function(xDir, yDir) {
    this.dBear = document.getElementById("speedBear").value;
    this.fitBounds(); // we add this instruction to keep the bear within the board
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display()
  };

  this.display = function() {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "absolute";
  };
  
  this.fitBounds = function() {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };
}

function start() {
  // create bear
  bear = new Bear();
  // Add an event listener to the keypress event.
  document.addEventListener("keydown", moveBear, false);
  // create new array for the bees
  bees = new Array();
  //initialize longest duration on keydown
  document.addEventListener("keydown", initializeLongestDuration);
  //create bees
  document.getElementById("nbBees").value = 1;
  document.getElementById("speedBees").value = 50;
  document.getElementById("periodTimer").value = 10;
  hits.innerHTML = 0;
  document.getElementById("duration").innerHTML = 0;
  makeBees();
  updateBees();
}

function initializeLongestDuration() {
  lastStingTime = new Date();
  document.removeEventListener("keydown", initializeLongestDuration);
}

function reset() {
  bear.x = 100;
  bear.y = 0;
  bear.display();
  lastStingTime = NaN;
  document.addEventListener("keydown", initializeLongestDuration);
  document.getElementById("nbBees").value = 1;
  document.getElementById("speedBees").value = 50;
  document.getElementById("speedBear").value = 100;
  document.getElementById("periodTimer").value = 10;
  hits.innerHTML = 0;
  document.getElementById("duration").innerHTML = 0;
  makeBees();
  updateBees();
}

// Handle keyboard events to move the bear
function moveBear(e) {
  // codes of the four keys
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;

  if (e.keyCode == KEYRIGHT) {
    bear.move(1,0);
  } // right key
  if (e.keyCode == KEYLEFT) {
    bear.move(-1,0);
  } // left key
  if (e.keyCode == KEYUP) {
    bear.move(0,-1);
  } // up key
  if (e.keyCode == KEYDOWN) {
    bear.move(0,1);
  } // down key
}

class Bee {
  constructor(beeNumber) {
    // the HTML element corresponding to the image of the bee
    this.htmlElement = createBeeImg(beeNumber);
    // iits HTML ID
    this.id = this.htmlElement.id;
    // the left position (x)
    this.x = this.htmlElement.offsetLeft;
    // the top position (y)
    this.y = this.htmlElement.offsetTop;

    this.move = function(dx, dy) {
      //move the beez by dx, dy
      this.x += dx;
      this.y += dy;
      this.display();
    };

    this.display = function() {
      // adjust position of bee and display it
      this.fitBounds(); // add this to adjust to bounds
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };

    this.fitBounds = function() {
      //check and make sure the bees stay in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;
      if (this.x < 0) this.x = 0;
      if (this.x > w - iw) this.x = w - iw;
      if (this.y < 0) this.y = 0;
      if (this.y > h - ih) this.y = h - ih;
    };
  }
}

function createBeeImg(wNum) {
  //get dimension and position of board div
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;
  //create the IMG element
  let img = document.createElement("img");
  img.setAttribute("src", "images/bee.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "A bee!");
  img.setAttribute("id", "bee" + wNum);
  img.setAttribute("class", "bee"); //set class of html tag img
  //add the IMG element to the DOM as a child of the board div
  img.style.position = "absolute";
  boardDiv.appendChild(img);
  //set initial positon
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = (boardDivX + x) + "px";
  img.style.top = (y) + "px";
  //return the img object
  return img;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function addBee() {
  //increments the number of bees
  document.getElementById("nbBees").value++;
}

function makeBees() {
  //store the length of the bees array
  var beesLength = bees.length;
  //get the number of bees specified by the user
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees); //try converting the content of the input to a number
  if (isNaN(nbBees)) {
    window.alert("Invalid number of bees");
    document.getElementById("nbBees").value = beesLength;
    return;
  }
  //remove extra bees
  if (nbBees < beesLength) {
    for (let i = beesLength; i > nbBees; i--) {
      document.getElementById("bee" + i).remove();
      bees.pop();
    }
  }
  //create more bees
  else {
    let i = beesLength + 1;
    while (i <= nbBees) {
      var num = i;
      var bee = new Bee(num); //create object and its IMG element
      bee.display(); //display the bee
      bees.push(bee); //add the bee object to the bees array
      i++;
    }
  }
}

function moveBees() {
  //console.log(bees);
  //get speed input field value
  let speed = document.getElementById("speedBees").value;
  if (isNaN(speed)) {
    window.alert("Invalid speed");
    document.getElementById("speedBees").value = 50;
    return;
  }
  //move each bee to random location
  for (let i = 0; i < bees.length; i++) {
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;
    bees[i].move(dx,dy);
    isHit(bees[i], bear); //we add this to count the number of stings
  }
}

function updateBees() { // update loop for game
  //creates new bees or removes extra bees if the value is changed
  makeBees();
  //move the bees randomly
  moveBees();
  //use a fixed update period
  let period = document.getElementById("periodTimer").value; //modify this to control refresh period
  let score = hits.innerHTML;
  score = Number(score);
  if (score >= 1000) {
    clearTimeout(updateTimer);
    window.alert("Game Over!");
    reset();
  }
  else {
    //update the timer for the next move
    updateTimer = setTimeout("updateBees()", period);
  }
}

function isHit(defender, offender) {
  if (overlap(defender, offender)) { //check if the two images overlap
    let score = hits.innerHTML;
    score = Number(score) + 1; //increments the score;
    hits.innerHTML = score; //displays the new score
    //calculate longest duration
    if (isNaN(lastStingTime)) {
      return;
    } else {
      let newStingTime = new Date();
      let thisDuration = newStingTime - lastStingTime;
      lastStingTime = newStingTime;
      let longestDuration = Number(duration.innerHTML);
      if (longestDuration === 0) {
        longestDuration = thisDuration;
      } else {
        if (longestDuration < thisDuration) longestDuration = thisDuration;
      }
      document.getElementById("duration").innerHTML = longestDuration;
    }
  }
}

function overlap(element1,element2) {
  //consider the two rectangles wrapping the two elements
  //rectangle of the frist element
  left1 = element1.htmlElement.offsetLeft;
  top1 = element1.htmlElement.offsetTop;
  right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
  //rectangle of the second element
  left2 = element2.htmlElement.offsetLeft;
  top2 = element2.htmlElement.offsetTop;
  right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
  //calculate the intersection of the two rectangles
  x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
  y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
  intersectArea = x_intersect * y_intersect;
  //if intersection is nil no hit
  if (intersectArea === 0 || isNaN(intersectArea)) {
    return false;
  }
  return true;
}