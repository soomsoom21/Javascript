// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-05
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
  while (k.frontIsClear()) {
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
  while (k.frontIsClear()) {
    k.pickBeeper();
    k.move();
  }
  k.pickBeeper();
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function main(k) {
    while (true) {
        // Pick up the entire pile
        while (k.beepersPresent()) {
            k.pickBeeper();
        }

        // Move east to Avenue 8
        while (k.frontIsClear()) {
            k.move();
        }

        // Drop the entire pile
        while (k.beepersInBag()) {
            k.putBeeper();
        }

        // Turn around to face west
        k.turnLeft();
        k.turnLeft();

        // Move back to Avenue 1
        while (k.frontIsClear()) {
            k.move();
        }

        // Face north
        k.turnLeft();
        k.turnLeft();
        k.turnLeft();

        // If there is another street, move there
        if (k.frontIsClear()) {
            k.move();

            // Face east again
            k.turnLeft();
            k.turnLeft();
            k.turnLeft();
        } else {
            // No more streets
            break;
        }
    }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: complex2 (Complex II)
// ──────────────────────────────────────────────────────────
function problem_4() {
function main(k) {
    while (!k.cornerColorIs("Red")) {

        // Pick up beepers across the row
        while (k.frontIsClear()) {
            if (k.beepersPresent()) {
                k.pickBeeper();
            }
            k.move();
        }

        // Pick up beeper at the end of the row
        if (k.beepersPresent()) {
            k.pickBeeper();
        }

        // Check if we reached the finish
        if (k.cornerColorIs("Red")) {
            break;
        }

        // Turn left and see if we can climb
        k.turnLeft();

        if (k.frontIsClear()) {
            k.move();
        } else {
            // No opening on this side.
            // Turn around and go back across the row.
            k.turnLeft();
            k.turnLeft();

            while (k.frontIsClear()) {
                if (k.beepersPresent()) {
                    k.pickBeeper();
                }
                k.move();
            }

            if (k.beepersPresent()) {
                k.pickBeeper();
            }

            // Face the other direction and climb
            k.turnLeft();
            k.move();
        }

        // Face across the new row
        k.turnLeft();
    }
}
  return main;
}
