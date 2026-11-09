// exam: exam-2
// title: Exam 2 · The DOM
// Copied from the exam page. Keep these header lines and the ===== markers.

// ===== problem 3: thickestBorder =====
// Match the thickest border (33 pts) — passed in browser
const boxes = document.querySelectorAll("#boxes div");

let thickestWidth = 0;

boxes.forEach((box) => {
  const borderWidth = parseInt(box.style.borderWidth);

  if (borderWidth > thickestWidth) {
    thickestWidth = borderWidth;
  }
});

boxes.forEach((box) => {
  box.style.borderWidth = `${thickestWidth}px`;
});
// ===== end problem 3 =====
