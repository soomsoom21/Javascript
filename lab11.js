// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-11
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

function countGroup(k, spaces) {
  let count = 0;

  for (let i = 0; i < spaces; i++) {
    if (k.beepersPresent()) {
      count++;
    }
    if (i < spaces - 1) {
      k.move();
    }
  }

  return count;
}

function main(k) {
  // Process streets 3 through 6.
  // Start at avenue 1, street 3, facing east.

  for (let street = 3; street <= 6; street++) {
    let leftCount = countGroup(k, 3);

    // Move from avenue 3 to avenue 5.
    k.move();
    k.move();

    let rightCount = countGroup(k, 3);
    let total = leftCount + rightCount;

    // Move to avenue 9.
    k.move();
    k.move();

    for (let i = 0; i < total; i++) {
      k.putBeeper();
      if (i < total - 1) {
        k.move();
      }
    }

    // Return to avenue 1.
    while (k.facingWest() === false) {
      k.turnLeft();
    }
    while (k.frontIsClear()) {
      k.move();
    }

    // Move up one street for the next pass.
    if (street < 6) {
      turnRight(k);
      k.move();
      turnRight(k);
    }
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function main(k) {
  let total = 17;
  let boxSize = 5;

  let fullBoxes = Math.floor(total / boxSize);
  let leftover = total % boxSize;

  for (let i = 0; i < fullBoxes; i++) {
    for (let j = 0; j < boxSize; j++) {
      k.putBeeper();
    }

    k.move();
  }

  for (let j = 0; j < leftover; j++) {
    k.putBeeper();
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function main(k) {
  for (let street = 1; street <= 6; street++) {
    for (let avenue = 1; avenue <= 7; avenue++) {
      let count = (avenue * street) % 5;

      for (let i = 0; i < count; i++) {
        k.putBeeper();
      }

      if (avenue < 7) {
        k.move();
      }
    }

    if (street < 6) {
      k.turnLeft();
      k.move();
      k.turnLeft();

      for (let i = 0; i < 6; i++) {
        k.move();
      }

      k.turnLeft();
      k.turnLeft();
    }
  }
}
  return main;
}
