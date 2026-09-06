// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-03
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
    if (k.beepersPresent()) {
        k.pickBeeper();
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function main(k) {
    if (k.beepersPresent()) {
        k.pickBeeper();
    }
    k.move();

    if (k.beepersPresent()) {
        k.pickBeeper();
    }
    k.move();

    if (k.beepersPresent()) {
        k.pickBeeper();
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function main(k) {
    if (k.beepersPresent()) {
        k.paintCorner("Red");
    }
    k.move();

    if (k.beepersPresent()) {
        k.paintCorner("Red");
    }
    k.move();

    if (k.beepersPresent()) {
        k.paintCorner("Red");
    }
    k.move();

    if (k.beepersPresent()) {
        k.paintCorner("Red");
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: complex2 (Complex II)
// ──────────────────────────────────────────────────────────
function problem_4() {
function placeBeepers(k) {
    if (k.cornerColorIs("Red")) {
        k.putBeeper();
    }

    if (k.cornerColorIs("Orange")) {
        k.putBeeper();
        k.putBeeper();
    }

    if (k.cornerColorIs("Blue")) {
        k.putBeeper();
        k.putBeeper();
        k.putBeeper();
    }
}

function sweepRow(k) {
    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
    k.move();

    placeBeepers(k);
}

function main(k) {
    // Row 1 → east
    sweepRow(k);
    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 2 → west
    sweepRow(k);
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
    k.move();
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();

    // Row 3 → east
    sweepRow(k);
    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 4 → west
    sweepRow(k);
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
    k.move();
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();

    // Row 5 → east
    sweepRow(k);
    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 6 → west
    sweepRow(k);
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
    k.move();
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();

    // Row 7 → east
    sweepRow(k);
    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 8 → west
    sweepRow(k);
}
  return main;
}
