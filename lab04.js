// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-04
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
  for (let i = 0; i < 5; i++) {
    k.move();
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function main(k) {
  for (let i = 0; i < 4; i++) {
    k.pickBeeper();
    k.move();
    k.turnLeft();
    k.move();
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
  }
  k.pickBeeper();
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function main(k) {
  // Perimeter
  for (let side = 0; side < 4; side++) {
    for (let step = 0; step < 4; step++) {
      k.pickBeeper();
      k.move();
    }
    k.turnLeft();
  }

  // Diagonal
  for (let i = 0; i < 3; i++) {
    k.move();
    k.turnLeft();
    k.move();
    turnRight(k);
    k.pickBeeper();
  }
}
  return main;
}
