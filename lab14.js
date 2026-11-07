// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-14
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
  let flags = [
    { avenue: 1, height: 2, color: "Red" },
    { avenue: 3, height: 4, color: "Blue" },
    { avenue: 4, height: 1, color: "Yellow" },
    { avenue: 6, height: 3, color: "Green" }
  ];

  let currentAvenue = 1;

  for (let flag of flags) {

    // Move to the correct avenue.
    while (currentAvenue < flag.avenue) {
      k.move();
      currentAvenue++;
    }

    // Face north.
    k.turnLeft();

    // Paint the flag.
    for (let i = 0; i < flag.height; i++) {
      k.paintCorner(flag.color);

      if (i < flag.height - 1) {
        k.move();
      }
    }

    // Return to street 1.
    turnAround(k);

    for (let i = 1; i < flag.height; i++) {
      k.move();
    }

    // Face east again.
    k.turnLeft();
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 2: moderate (Moderate)
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

// Count beepers and put them back.
function countPile(k) {
  let count = 0;

  while (k.beepersPresent()) {
    k.pickBeeper();
    count++;
  }

  for (let i = 0; i < count; i++) {
    k.putBeeper();
  }

  return count;
}

function main(k) {
  let best = { street: 0, total: -1 };

  // Survey all five streets.
  for (let street = 1; street <= 5; street++) {

    let total = 0;

    // Count every pile on this street.
    while (true) {
      total += countPile(k);

      if (k.frontIsClear()) {
        k.move();
      } else {
        break;
      }
    }

    // Return to the west wall.
    turnAround(k);

    while (k.frontIsClear()) {
      k.move();
    }

    // Save the street if it has the highest total.
    if (total > best.total) {
      best = {
        street: street,
        total: total
      };
    }

    // Move to the next street.
    if (street < 5) {
      turnRight(k);
      k.move();
      turnRight(k);
    }
  }

  // Return to street 1.
  k.turnLeft();

  while (k.frontIsClear()) {
    k.move();
  }

  // Face east.
  k.turnLeft();

  // Travel north to the winning street.
  k.turnLeft();

  for (let i = 1; i < best.street; i++) {
    k.move();
  }

  // Face east and paint the winning street.
  turnRight(k);

  while (true) {
    k.paintCorner("Yellow");

    if (k.frontIsClear()) {
      k.move();
    } else {
      break;
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

function turnAround(k) {
  k.turnLeft();
  k.turnLeft();
}

// Move Karel and update its position.
function step(k, pos) {
  if (k.facingEast()) {
    k.move();
    pos.avenue++;
  } else if (k.facingWest()) {
    k.move();
    pos.avenue--;
  } else if (k.facingNorth()) {
    k.move();
    pos.street++;
  } else if (k.facingSouth()) {
    k.move();
    pos.street--;
  }
}

// Return home while keeping track of position.
function goHome(k, pos) {
  while (!k.facingWest()) {
    k.turnLeft();
  }

  while (k.frontIsClear()) {
    step(k, pos);
  }

  k.turnLeft();

  while (k.frontIsClear()) {
    step(k, pos);
  }

  k.turnLeft();
}

// Travel to a specified position from home.
function goTo(k, pos, spot) {
  while (pos.avenue < spot.avenue) {
    step(k, pos);
  }

  k.turnLeft();

  while (pos.street < spot.street) {
    step(k, pos);
  }

  turnRight(k);
}

function main(k) {
  let pos = { avenue: 1, street: 1 };

  let bounds = {
    west: 0,
    east: 0,
    south: 0,
    north: 0
  };

  let found = false;
  let eastbound = true;
  let finished = false;

  // FIRST PASS: Find all beepers.
  while (!finished) {

    if (k.beepersPresent()) {

      if (!found) {
        bounds.west = pos.avenue;
        bounds.east = pos.avenue;
        bounds.south = pos.street;
        bounds.north = pos.street;
        found = true;

      } else {
        bounds.west = Math.min(bounds.west, pos.avenue);
        bounds.east = Math.max(bounds.east, pos.avenue);
        bounds.south = Math.min(bounds.south, pos.street);
        bounds.north = Math.max(bounds.north, pos.street);
      }
    }

    if (k.frontIsClear()) {
      step(k, pos);

    } else {

      if (eastbound) {
        k.turnLeft();
      } else {
        turnRight(k);
      }

      if (k.frontIsClear()) {
        step(k, pos);

        if (eastbound) {
          k.turnLeft();
        } else {
          turnRight(k);
        }

        eastbound = !eastbound;

      } else {
        finished = true;
      }
    }
  }

  // Return home.
  goHome(k, pos);

  // SECOND PASS: Paint the rectangle.
  goTo(k, pos, {
    avenue: bounds.west,
    street: bounds.south
  });

  // Paint the southern edge.
  k.paintCorner("Yellow");

  while (pos.avenue < bounds.east) {
    step(k, pos);
    k.paintCorner("Yellow");
  }

  // Paint the eastern edge.
  k.turnLeft();

  while (pos.street < bounds.north) {
    step(k, pos);
    k.paintCorner("Yellow");
  }

  // Paint the northern edge.
  k.turnLeft();

  while (pos.avenue > bounds.west) {
    step(k, pos);
    k.paintCorner("Yellow");
  }

  // Paint the western edge.
  k.turnLeft();

  while (pos.street > bounds.south) {
    step(k, pos);
    k.paintCorner("Yellow");
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

function readColor(k) {
  let colors = [
    "Red", "Black", "Cyan", "Dark Gray",
    "Gray", "Green", "Light Gray", "Magenta",
    "Orange", "Pink", "White", "Blue", "Yellow"
  ];

  for (let color of colors) {
    if (k.cornerColorIs(color)) {
      return color;
    }
  }

  return null;
}

function takePile(k) {
  let count = 0;

  while (k.beepersPresent()) {
    k.pickBeeper();
    count++;
  }

  return count;
}

function putMany(k, count) {
  for (let i = 0; i < count; i++) {
    k.putBeeper();
  }
}

function main(k) {
  let row = [];
  let maxSize = 0;

  // Pick up the row and save its information.
  while (k.frontIsClear()) {
    k.move();

    let color = readColor(k);
    let size = takePile(k);

    row.push({
      color: color,
      size: size
    });

    if (size > maxSize) {
      maxSize = size;
    }
  }

  // Return to the blank corner at the west end.
  turnAround(k);

  while (k.frontIsClear()) {
    k.move();
  }

  turnAround(k);

  // Put the records back from smallest to largest.
  for (let size = 0; size <= maxSize; size++) {
    for (let pile of row) {
      if (pile.size === size) {
        k.move();

        if (pile.color !== null) {
          k.paintCorner(pile.color);
        }

        putMany(k, pile.size);
      }
    }
  }
}
  return main;
}

