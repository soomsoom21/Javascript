// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-09
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
    for (let row = 0; row < 8; row++) {

        if (k.cornerColorIs("Blue") && k.beepersPresent()) {
            k.pickBeeper();
        }

        while (k.frontIsClear()) {
            k.move();

            if (k.cornerColorIs("Blue") && k.beepersPresent()) {
                k.pickBeeper();
            }
        }

        if (row < 7) {
            if (row % 2 === 0) {
                // Turn left, go up, turn left
                k.turnLeft();
                k.move();
                k.turnLeft();
            } else {
                // Turn right = 3 left turns
                k.turnLeft();
                k.turnLeft();
                k.turnLeft();

                k.move();

                k.turnLeft();
                k.turnLeft();
                k.turnLeft();
            }
        }
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
// ──────────────────────────────────────────────────────────
function problem_2() {
function countGreen(k) {
    let count = 0;

    for (let row = 0; row < 3; row++) {

        if (k.cornerColorIs("Green")) {
            count++;
        }

        while (k.frontIsClear()) {
            k.move();

            if (k.cornerColorIs("Green")) {
                count++;
            }
        }

        if (row < 2) {
            if (row % 2 === 0) {
                // Turn left, move up, turn left
                k.turnLeft();
                k.move();
                k.turnLeft();
            } else {
                // Turn right
                k.turnLeft();
                k.turnLeft();
                k.turnLeft();

                k.move();

                k.turnLeft();
                k.turnLeft();
                k.turnLeft();
            }
        }
    }

    return count;
}

function main(k) {
    let total = countGreen(k);

    for (let i = 0; i < total; i++) {
        k.putBeeper();
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function beepersInLargerPile(k) {
    let leftCount = 0;
    let rightCount = 0;

    while (k.beepersPresent()) {
        k.pickBeeper();
        leftCount++;
    }

    k.move();

    while (k.beepersPresent()) {
        k.pickBeeper();
        rightCount++;
    }

    k.turnLeft();
    k.turnLeft();
    k.move();
    k.turnLeft();
    k.turnLeft();

    if (rightCount > leftCount) {
        return "right";
    } else {
        return "left";
    }
}

function markWinner(k, winner) {
    if (winner == "right") {
        k.move();
        k.paintCorner("Red");

        k.turnLeft();
        k.turnLeft();
        k.move();
        k.turnLeft();
        k.turnLeft();
    } else {
        k.paintCorner("Red");
    }
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
    k.move();
    markWinner(k, beepersInLargerPile(k));

    for (let i = 0; i < 3; i++) k.move();
    k.turnLeft();
    k.move();
    k.move();
    turnRight(k);
    markWinner(k, beepersInLargerPile(k));

    k.turnLeft();
    k.move();
    k.move();
    k.turnLeft();
    for (let i = 0; i < 4; i++) k.move();
    turnRight(k);
    turnRight(k);
    markWinner(k, beepersInLargerPile(k));

    k.turnLeft();
    k.move();
    k.move();
    turnRight(k);
    for (let i = 0; i < 5; i++) k.move();
    markWinner(k, beepersInLargerPile(k));
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: complex2 (Complex II)
// ──────────────────────────────────────────────────────────
function problem_4() {
function isMarked(k) {
    return k.beepersPresent() && k.cornerColorIs("Orange");
}

function collectMarked(k) {
    let count = 0;

    if (isMarked(k)) {
        k.pickBeeper();
        count++;
    }

    while (k.frontIsClear()) {
        k.move();

        if (isMarked(k)) {
            k.pickBeeper();
            count++;
        }
    }

    return count;
}

function turnRight(k) {
    k.turnLeft();
    k.turnLeft();
    k.turnLeft();
}

function main(k) {
    let total = 0;

    // Row 1 → east
    total = total + collectMarked(k);

    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 2 → west
    total = total + collectMarked(k);

    turnRight(k);
    k.move();
    turnRight(k);

    // Row 3 → east
    total = total + collectMarked(k);

    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 4 → west
    total = total + collectMarked(k);

    turnRight(k);
    k.move();
    turnRight(k);

    // Row 5 → east
    total = total + collectMarked(k);

    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 6 → west
    total = total + collectMarked(k);

    turnRight(k);
    k.move();
    turnRight(k);

    // Row 7 → east
    total = total + collectMarked(k);

    k.turnLeft();
    k.move();
    k.turnLeft();

    // Row 8 → west
    total = total + collectMarked(k);

    // Drop total beepers on final corner
    for (let i = 0; i < total; i++) {
        k.putBeeper();
    }
}
  return main;
}
