// assignment: exam-2
// student: Sophia Weinert
// downloaded: 11/9/2026, 7:37:27 PM

// ===== Problem 1: Word Swap (4/6 worlds matched at last run) =====
function problem_1() {
const LETTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const SWAP = {
  HOT: "COLD",
  FAST: "SLOW",
  YES: "NO",
  UP: "DOWN",
};

function takePile(k) {
  let count = 0;
  while (k.beepersPresent()) {
    k.pickBeeper();
    count++;
  }
  return count;
}

function dropPile(k, count) {
  for (let i = 0; i < count; i++) {
    k.putBeeper();
  }
}

function main(k) {
  let word = "";
  let avenue = 1;

  // Read until the word we have is a known key.
  while (avenue < 5 && SWAP[word] === undefined) {
    k.move();
    avenue++;
    word += LETTERS[takePile(k)];
  }

  const replacement = SWAP[word];

  while (avenue < 7) {
    k.move();
    avenue++;
  }

  if (replacement !== undefined) {
    for (let i = 0; i < replacement.length; i++) {
      dropPile(k, LETTERS.indexOf(replacement[i]));
      if (i < replacement.length - 1) k.move();
    }
  }
}
  return main;
}
// ===== end Problem 1 =====

// ===== Problem 2: Color Swap (5/5 worlds matched at last run) =====
function problem_2() {
const COLORS = [
  "Red", "Orange", "Yellow", "Green", "Blue",
  "Purple", "Magenta", "Violet", "Fuchsia",
  "Cyan", "Aqua", "LightBlue", "Turquoise", "Teal",
  "Pink", "LightPink"
];

function turnRight(k) { k.turnLeft(); k.turnLeft(); k.turnLeft(); }

function isColor(k, c) {
  try { return k.cornerColorIs(c); } catch (e) { return false; }
}

function readColor(k) {
  for (const c of COLORS) {
    if (isColor(k, c)) return c;
  }
  return "";
}

function readKey(k) {
  const swap = {};
  k.move();                                   // (2, 1)
  while (true) {
    const oldColor = readColor(k);
    if (oldColor === "" || !k.frontIsClear()) break;
    k.move();
    const newColor = readColor(k);
    if (newColor === "") break;
    swap[oldColor] = newColor;
    if (!k.frontIsClear()) break;
    k.move();
  }
  return swap;
}

function recolorCorner(k, swap, keys) {
  for (const c of keys) {
    if (isColor(k, c)) {
      k.paintCorner(swap[c]);
      return;                                 // never repaint a corner twice
    }
  }
}

function recolorRow(k, swap, keys) {
  recolorCorner(k, swap, keys);
  while (k.frontIsClear()) {
    k.move();
    recolorCorner(k, swap, keys);
  }
}

function main(k) {
  const swap = readKey(k);
  const keys = Object.keys(swap);

  while (k.frontIsClear()) k.move();          // east end of street 1
  k.turnLeft(); k.move(); k.turnLeft();       // (11, 2), facing west

  for (let street = 2; street <= 8; street++) {
    recolorRow(k, swap, keys);
    if (street === 8) break;
    if (street % 2 === 0) { turnRight(k); k.move(); turnRight(k); }   // ended facing west
    else { k.turnLeft(); k.move(); k.turnLeft(); }                     // ended facing east
  }
}
  return main;
}
// ===== end Problem 2 =====
