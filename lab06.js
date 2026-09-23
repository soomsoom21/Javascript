// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-06
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
    // Walk north to (1, 3)
    k.move();
    k.move();

    if (k.beepersPresent()) {
        k.pickBeeper();
    } else {
        k.putBeeper();
    }

    // Turn right and walk east to (3, 3)
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();

    k.move();
    k.move();

    if (k.beepersPresent()) {
        k.pickBeeper();
    } else {
        k.putBeeper();
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function main(k) {
    for (let i = 0; i < 13; i++) {
        if (k.frontIsClear()) {
            k.move();
            k.putBeeper();
        } else {
            k.turnLeft();
        }
    }
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

function paintCorner(k) {
    if (k.beepersPresent()) {
        k.paintCorner("Blue");
    } else {
        k.paintCorner("Red");
    }
}

function sweepRow(k) {
    paintCorner(k);

    while (k.frontIsClear()) {
        k.move();
        paintCorner(k);
    }
}

function climbToNextRow(k) {
    if (k.facingEast()) {
        k.turnLeft();
        k.move();
        k.turnLeft();
    } else {
        turnRight(k);
        k.move();
        turnRight(k);
    }
}

function main(k) {
    for (let row = 0; row < 3; row++) {
        sweepRow(k);
        climbToNextRow(k);
    }

    sweepRow(k);
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: advanced (Advanced)
// ──────────────────────────────────────────────────────────
function problem_4() {
function turnRight(k) {
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
}

function stockCorner(k) {
    if (k.beepersPresent()) {
        // Already stocked — leave it alone
    } else if (k.cornerColorIs("Red")) {
        for (let i = 0; i < 4; i++) {
            k.putBeeper();
        }
    } else if (k.cornerColorIs("Green")) {
        for (let i = 0; i < 2; i++) {
            k.putBeeper();
        }
    } else if (k.cornerColorIs("Blue")) {
        k.putBeeper();
    }
}

function stockRow(k) {
    stockCorner(k);

    while (k.frontIsClear()) {
        k.move();
        stockCorner(k);
    }
}

function climbToNextRow(k) {
    if (k.facingEast()) {
        k.turnLeft();
        k.move();
        k.turnLeft();
    } else {
        turnRight(k);
        k.move();
        turnRight(k);
    }
}

function main(k) {
    for (let row = 0; row < 3; row++) {
        stockRow(k);
        climbToNextRow(k);
    }

    stockRow(k);
}
  return main;
}
