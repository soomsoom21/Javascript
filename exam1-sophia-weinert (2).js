// assignment: exam-1
// student: Sophia Weinert
// downloaded: 10/7/2026, 1:17:26 PM

// ===== Problem 1: Hallway Lights (5/5 worlds matched at last run) =====
function problem_1() {
function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function inspect(k) {
  if (k.beepersPresent()) {
    k.pickBeeper();
  }

  if (k.cornerColorIs("Red")) {
    k.paintCorner("Yellow");
  }
}

function main(k) {
  // Sweep all 8 hallways
  for (let row = 0; row < 8; row++) {

    // Inspect the starting corner of this hallway
    inspect(k);

    // Move across the hallway, inspecting every corner
    while (k.frontIsClear()) {
      k.move();
      inspect(k);
    }

    // Move up to the next hallway, except after the last row
    if (row < 7) {
      if (k.facingEast()) {
        // At the right end: turn north, move up, face west
        k.turnLeft();
        k.move();
        k.turnLeft();
      } else {
        // At the left end: turn north, move up, face east
        turnRight(k);
        k.move();
        turnRight(k);
      }
    }
  }

  // Put down one beeper at the finish if Karel has any
  if (k.beepersInBag()) {
    k.putBeeper();
  }
}
  return main;
}
// ===== end Problem 1 =====

// ===== Problem 2: Sorting Stones (6/6 worlds matched at last run) =====
function problem_2() {
function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}


// Pick up a stone and return its color.
function inspectStone(k) {
  if (k.beepersPresent()) {
    k.pickBeeper();

    if (k.cornerColorIs("Red")) {
      return "Red";
    } else if (k.cornerColorIs("Green")) {
      return "Green";
    } else {
      return "Blue";
    }
  } else {
    return "";
  }
}

// Return Karel all the way to (1,1).
function goHome(k) {
  // Karel is facing north inside a bucket.
  turnAround(k);

  // Go south to street 1.
  while (k.frontIsClear()) {
    k.move();
  }

  // Now facing south at street 1.
  // Turn west.
  turnRight(k);

  // Go west to avenue 1.
  while (k.frontIsClear()) {
    k.move();
  }

  // Now at (1,1), facing west.
  // Turn around to face east.
  turnAround(k);
}


// Go from (1,1) to the correct destination bucket.
function enterBucket(k, avenue) {

  if (avenue === 3) {
    k.move();
    k.move();
  } else if (avenue === 5) {
    k.move();
    k.move();
    k.move();
    k.move();
  } else {
    k.move();
    k.move();
    k.move();
    k.move();
    k.move();
    k.move();
  }

  // Face north.
  k.turnLeft();

  // Enter the bucket.
  k.move();
}
// Put one stone into the first empty spot.
function putStone(k, avenue) {
  goHome(k);
  enterBucket(k, avenue);

  // Move upward past stones that are already there.
  while (k.beepersPresent()) {
    k.move();
  }

  // First empty corner.
  k.putBeeper();
}


function main(k) {
  let redCount = 0;
  let greenCount = 0;
  let blueCount = 0;


  // Enter the source bucket.
  k.move();

  // Six source corners: streets 2 through 7.
  for (let i = 0; i < 6; i++) {

    let color = inspectStone(k);

    if (color === "Red") {
      redCount++;
    } else if (color === "Green") {
      greenCount++;
    } else {
      if (color === "Blue") {
        blueCount++;
      }
    }

    if (i < 5) {
      k.move();
    } else {
      // We are finished scanning the source bucket.
    }
  }

  // 0 = Red, 1 = Green, 2 = Blue
  for (let color = 0; color < 3; color++) {

    let count;
    let avenue;

    if (color === 0) {
      count = redCount;
      avenue = 3;
    } else if (color === 1) {
      count = greenCount;
      avenue = 5;
    } else {
      count = blueCount;
      avenue = 7;
    }

    // Nested for loop.
    for (let i = 0; i < count; i++) {
      putStone(k, avenue);
    }
  }
}
  return main;
}
// ===== end Problem 2 =====

// ===== Problem 3: Treasure Map (7/7 worlds matched at last run) =====
function problem_3() {
function turnAround(k) {
    k.turnLeft();
    k.turnLeft();
}

function countPile(k) {
    let count = 0;

    while (k.beepersPresent()) {
        k.pickBeeper();
        count++;
    }

    return count;
}

function moveSteps(k, amount, direction) {
    if (direction === "east") {
        while (amount > 0) {
            k.move();
            amount--;
        }
    } else if (direction === "west") {
        turnAround(k);

        while (amount > 0) {
            k.move();
            amount--;
        }

        turnAround(k);
    } else {
        k.turnLeft();

        while (amount > 0) {
            k.move();
            amount--;
        }
    }
}

function main(k) {
    let total = 0;

    let avenue = countPile(k);
    total = total + avenue;

    k.move();

    let street = countPile(k);
    total = total + street;

    let color;

    if (avenue > street) {
        color = "Red";
    } else if (street > avenue) {
        color = "Blue";
    } else {
        color = "Green";
    }

    moveSteps(k, 1, "west");
    moveSteps(k, avenue - 1, "east");
    moveSteps(k, street - 1, "north");

    k.paintCorner(color);

    while (k.beepersInBag()) {
        k.putBeeper();
    }
}
  return main;
}
// ===== end Problem 3 =====
