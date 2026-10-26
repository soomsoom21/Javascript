// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-13
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

function main(k) {
  let heights = [2, 4, 1, 3, 2];
  let colors = ["Red", "Orange", "Yellow", "Green", "Blue"];

  for (let i = 0; i < heights.length; i++) {
    // Face north to paint the bar.
    k.turnLeft();

    for (let h = 0; h < heights[i]; h++) {
      k.paintCorner(colors[i]);

      if (h < heights[i] - 1) {
        k.move();
      }
    }

    // Return to Street 1.
    turnAround(k);

    while (k.frontIsClear()) {
      k.move();
    }

    // Face east toward the next avenue.
    k.turnLeft();

    if (i < heights.length - 1) {
      k.move();
    }
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function takePile(k) {
  let n = 0;

  while (k.beepersPresent()) {
    k.pickBeeper();
    n++;
  }

  return n;
}

function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

function main(k) {
  let totals = new Array(5).fill(0);

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      let avenue;

      if (row % 2 === 0) {
        avenue = col;
      } else {
        avenue = 4 - col;
      }

      totals[avenue] += takePile(k);

      if (col < 4) {
        k.move();
      }
    }

    if (row < 4) {
      if (row % 2 === 0) {
        k.turnLeft();
        k.move();
        k.turnLeft();
      } else {
        turnRight(k);
        k.move();
        turnRight(k);
      }
    }
  }

  // Return to avenue 1 on the top street.
  turnAround(k);

  while (k.frontIsClear()) {
    k.move();
  }

  // Go down to street 1 and face east.
  k.turnLeft();

  while (k.frontIsClear()) {
    k.move();
  }

  k.turnLeft();

  // Rebuild the piles on street 1.
  for (let col = 0; col < 5; col++) {
    for (let b = 0; b < totals[col]; b++) {
      k.putBeeper();
    }

    if (col < 4) {
      k.move();
    }
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function takePile(k) {
  let n = 0;

  while (k.beepersPresent()) {
    k.pickBeeper();
    n++;
  }

  return n;
}

function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

function main(k) {
  while (true) {
    let piles = [];

    // Collect the word on this street.
    while (k.beepersPresent()) {
      piles.push(takePile(k));

      if (k.frontIsClear()) {
        k.move();
      } else {
        break;
      }
    }

    // Walk to the east wall.
    while (k.frontIsClear()) {
      k.move();
    }

    // Lay the word back down, starting at the east wall.
    turnAround(k);

    while (piles.length > 0) {
      for (let b = 0, n = piles.pop(); b < n; b++) {
        k.putBeeper();
      }

      if (piles.length > 0) {
        k.move();
      }
    }

    // Return to avenue 1.
    while (k.frontIsClear()) {
      k.move();
    }

    // Stop at the top street; otherwise advance one street.
    turnRight(k); // Face north.
    if (!k.frontIsClear()) {
      break;
    }

    k.move();
    turnRight(k); // Face east.
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: complex2 (Complex II)
// ──────────────────────────────────────────────────────────
function problem_4() {
function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

function faceNorth(k) {
  while (!k.facingNorth()) {
    k.turnLeft();
  }
}

function faceEast(k) {
  while (!k.facingEast()) {
    k.turnLeft();
  }
}

function faceSouth(k) {
  while (!k.facingSouth()) {
    k.turnLeft();
  }
}

function faceWest(k) {
  while (!k.facingWest()) {
    k.turnLeft();
  }
}

function goToSouthwest(k) {
  faceWest(k);
  while (k.frontIsClear()) {
    k.move();
  }

  faceSouth(k);
  while (k.frontIsClear()) {
    k.move();
  }

  faceEast(k);
}

function nextRow(k) {
  // Move one street north, return to the west edge,
  // and face east to scan the next row.
  k.turnLeft();
  k.move();
  k.turnLeft();

  while (k.frontIsClear()) {
    k.move();
  }

  turnAround(k);
}

function main(k) {
  // Find the size of the square world.
  goToSouthwest(k);

  let n = 1;
  while (k.frontIsClear()) {
    k.move();
    n++;
  }

  goToSouthwest(k);

  // Step 1: Store every pile in its correct grid cell.
  let grid = [];

  for (let r = 0; r < n; r++) {
    grid[r] = [];

    for (let c = 0; c < n; c++) {
      let count = 0;

      while (k.beepersPresent()) {
        k.pickBeeper();
        count++;
      }

      grid[r][c] = count;

      if (c < n - 1) {
        k.move();
      }
    }

    if (r < n - 1) {
      nextRow(k);
    }
  }

  // Step 2: Return to the southwest corner.
  goToSouthwest(k);

  // Step 3: Place the piles in their clockwise-rotated positions.
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let count = grid[c][n - 1 - r];

      for (let b = 0; b < count; b++) {
        k.putBeeper();
      }

      if (c < n - 1) {
        k.move();
      }
    }

    if (r < n - 1) {
      nextRow(k);
    }
  }
}
  return main;
}

