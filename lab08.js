// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-08
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Easy)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
    let steps = 0;

    // Put beepers along the bottom arm
    k.putBeeper();

    while (k.frontIsClear()) {
        k.move();
        k.putBeeper();
        steps = steps + 1;
    }

    // Turn north
    k.turnLeft();

    // Make the second arm the same length
    for (let i = 0; i < steps; i++) {
        k.move();
        k.putBeeper();
    }
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

function main(k) {
    let checkingRows = true;

    while (checkingRows) {
        let count = 0;

        // Pick up every beeper on the current row
        while (k.frontIsClear()) {
            while (k.beepersPresent()) {
                k.pickBeeper();
                count++;
            }

            k.move();
        }

        // Check the last corner of the row
        while (k.beepersPresent()) {
            k.pickBeeper();
            count++;
        }

        // Turn around
        k.turnLeft();
        k.turnLeft();

        // Return to avenue 1
        while (k.frontIsClear()) {
            k.move();
        }

        // Put the entire row's pile here
        for (let i = 0; i < count; i++) {
            k.putBeeper();
        }

        // Face north
        turnRight(k);

        // Check for another row
        if (k.frontIsClear()) {
            k.move();
            turnRight(k);
        } else {
            checkingRows = false;
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

function main(k) {
    let checkingRows = true;

    while (checkingRows) {
        let redCount = 0;
        let greenCount = 0;

        // Count the colors in this row
        if (k.cornerColorIs("Red")) {
            redCount++;
        }

        if (k.cornerColorIs("Green")) {
            greenCount++;
        }

        while (k.frontIsClear()) {
            k.move();

            if (k.cornerColorIs("Red")) {
                redCount++;
            }

            if (k.cornerColorIs("Green")) {
                greenCount++;
            }
        }

        // Decide the color to use
        let color;

        if (redCount > greenCount) {
            color = "Red";
        } else if (greenCount > redCount) {
            color = "Green";
        } else {
            color = "Yellow";
        }

        // Turn around and go back across the row
        k.turnLeft();
        k.turnLeft();

        // Check the current corner before moving
        if (!k.cornerColorIs("Red") && !k.cornerColorIs("Green")) {
            k.paintCorner(color);
        }

        while (k.frontIsClear()) {
            k.move();

            if (!k.cornerColorIs("Red") && !k.cornerColorIs("Green")) {
                k.paintCorner(color);
            }
        }

        // Go to the next row
        turnRight(k);

        if (k.frontIsClear()) {
            k.move();
            turnRight(k);
        } else {
            checkingRows = false;
        }
    }
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

function main(k) {
    let checkingRows = true;
    let currentRow = 1;
    let maxRow = 1;
    let maxCount = 0;

    // Find the row with the most beepers
    while (checkingRows) {
        let count = 0;

        if (k.beepersPresent()) {
            count++;
        }

        while (k.frontIsClear()) {
            k.move();

            if (k.beepersPresent()) {
                count++;
            }
        }

        if (count > maxCount) {
            maxCount = count;
            maxRow = currentRow;
        }

        // Return to west end
        k.turnLeft();
        k.turnLeft();

        while (k.frontIsClear()) {
            k.move();
        }

        // Go to next row
        turnRight(k);

        if (k.frontIsClear()) {
            k.move();
            currentRow++;
            turnRight(k);
        } else {
            checkingRows = false;
        }
    }

    // We are now at the west end of the top row, facing north.
    // Go south to the winning row.
    k.turnLeft();
    k.turnLeft();

    for (let i = 1; i < maxRow; i++) {
        k.move();
    }

    // Face east
    k.turnLeft();

    // Pick up every beeper on the winning row
    if (k.beepersPresent()) {
        k.pickBeeper();
    }

    while (k.frontIsClear()) {
        k.move();

        if (k.beepersPresent()) {
            k.pickBeeper();
        }
    }

    // Return to west end
    k.turnLeft();
    k.turnLeft();

    while (k.frontIsClear()) {
        k.move();
    }

    // Put all beepers in one pile
    for (let i = 0; i < maxCount; i++) {
        k.putBeeper();
    }
}
  return main;
}
