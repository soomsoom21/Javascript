// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-07
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Easy)
// ──────────────────────────────────────────────────────────
function problem_1() {
function moveN(k, n) {
    for (let i = 0; i < n; i++) {
        k.move();
    }
}

function main(k) {
    moveN(k, 4);

    k.turnLeft();

    moveN(k, 3);
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Medium)
// ──────────────────────────────────────────────────────────
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

function moveN(k, n) {
    for (let i = 0; i < n; i++) {
        k.move();
    }
}

function drawBar(k, height) {
    for (let i = 0; i < height - 1; i++) {
        k.putBeeper();
        k.move();
    }

    k.putBeeper();

    turnAround(k);
    moveN(k, height - 1);
    turnAround(k);
}

function nextColumn(k) {
    turnRight(k);
    k.move();
    k.turnLeft();
}

function main(k) {
    k.turnLeft();

    drawBar(k, 2);
    nextColumn(k);

    drawBar(k, 4);
    nextColumn(k);

    drawBar(k, 3);
    nextColumn(k);

    drawBar(k, 1);
    nextColumn(k);

    drawBar(k, 5);
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Difficult)
// ──────────────────────────────────────────────────────────
function problem_3() {
function paintN(k, c, n) {
    for (let i = 0; i < n; i++) {
        k.paintCorner(c);
        k.move();
    }
}

function main(k) {
    paintN(k, "Red", 4);
    k.turnLeft();

    paintN(k, "Blue", 3);
    k.turnLeft();

    paintN(k, "Green", 4);
    k.turnLeft();

    paintN(k, "Yellow", 3);
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: hard (Hard)
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

function moveN(k, n) {
    for (let i = 0; i < n; i++) {
        k.move();
    }
}

function drawBar(k, height) {
    for (let i = 0; i < height; i++) {
        k.putBeeper();

        if (i < height - 1) {
            k.move();
        }
    }

    turnAround(k);
    moveN(k, height - 1);
    turnAround(k);
}

function nextColumn(k) {
    turnRight(k);
    k.move();
    k.turnLeft();
}

function main(k) {
    k.turnLeft();

    for (let i = 0; i < 7; i++) {
        let height;

        if (i < 4) {
            height = i + 1;
        } else {
            height = 7 - i;
        }

        drawBar(k, height);

        if (i < 6) {
            nextColumn(k);
        }
    }

    // At (7,1), facing north
    k.turnLeft();       // face west
    moveN(k, 6);        // move to (1,1)
    turnAround(k);      // face east
}
  return main;
}
