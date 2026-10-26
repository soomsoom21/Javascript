// Karel submission — do not remove the header or the function wrappers.
// assignment: lesson-12
//
// Each problem below is wrapped in an outer function that returns its
// main(k), so your instructor's grader can run and grade every one.

// ──────────────────────────────────────────────────────────
// Problem 1: simple (Simple)
// ──────────────────────────────────────────────────────────
function problem_1() {
function main(k) {
  let first = "Kar";
  let second = "el";
  let word = first + second;

  for (let i = 0; i < word.length; i++) {
    k.putBeeper();
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
  let word = "beeper";
  let eCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === "e") {
      eCount++;
    }
  }

  for (let i = 0; i < eCount; i++) {
    k.putBeeper();
  }

  let pPosition = word.indexOf("p");

  for (let i = 0; i < pPosition; i++) {
    k.move();
  }

  k.putBeeper();
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 3: complex (Complex)
// ──────────────────────────────────────────────────────────
function problem_3() {
function main(k) {
  let cmds = "m4l1M3L1m2";

  for (let i = 0; i < cmds.length; i += 2) {
    let command = cmds[i].toUpperCase();
    let times = Number(cmds[i + 1]);

    for (let j = 0; j < times; j++) {
      if (command === "M") {
        k.move();
      } else if (command === "L") {
        k.turnLeft();
      }
    }
  }
}
  return main;
}

// ──────────────────────────────────────────────────────────
// Problem 4: complex2 (Complex II)
// ──────────────────────────────────────────────────────────
function problem_4() {
function paint(k, code) {
  if (code === "R") k.paintCorner("Red");
  if (code === "G") k.paintCorner("Green");
  if (code === "B") k.paintCorner("Blue");
  if (code === "Y") k.paintCorner("Yellow");
  if (code === "C") k.paintCorner("Cyan");
}

function turnRight(k) {
  k.turnLeft();
  k.turnLeft();
  k.turnLeft();
}

function paintRow(k, plan) {
  for (let i = 0; i < plan.length; i++) {
    paint(k, plan[i]);
    if (i < plan.length - 1) {
      k.move();
    }
  }
}

function nextRow(k) {
  k.turnLeft();
  k.turnLeft();

  while (k.frontIsClear()) {
    k.move();
  }

  turnRight(k);
  k.move();
  turnRight(k);
}

function main(k) {
  let plan = "RGBYC";

  // Bottom row: original plan
  paintRow(k, plan);

  nextRow(k);

  // Middle row: reverse the plan
  let reversed = "";

  for (let i = 0; i < plan.length; i++) {
    reversed = plan[i] + reversed;
  }

  paintRow(k, reversed);

  nextRow(k);

  // Top row: rotate left by one character
  let rotated = plan.slice(1) + plan[0];

  paintRow(k, rotated);
}
  return main;
}

