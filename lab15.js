// lab: lab-13
// title: The DOM I
// Copied from the lab page. Keep these header lines and the ===== markers.

// ===== problem 1: simple =====
// Status message (10 pts) — passed in browser
function setStatus(text, ok) {
  const status = document.getElementById("status");

  status.textContent = text;
  status.classList.remove("ok", "error");
  status.classList.add(ok ? "ok" : "error");
}
// ===== end problem 1 =====

// ===== problem 2: moderate =====
// Highlighter (10 pts) — passed in browser
function highlight(selector, cls) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    element.classList.add(cls);
  });

  return elements.length;
}

function clearHighlight(cls) {
  const elements = document.querySelectorAll("." + cls);

  elements.forEach(element => {
    element.classList.remove(cls);
  });

  return elements.length;
}
// ===== end problem 2 =====

// ===== problem 3: complex =====
// Read and validate an order form (10 pts) — passed in browser
function readOrder() {
  const form = document.getElementById("order").elements;

  const name = form.name.value.trim();
  const size = form.size.value;
  const crust = form.crust.value;

  const toppings = [...document.querySelectorAll(
    'input[name="topping"]:checked'
  )].map(input => input.value);

  const delivery = form.delivery.checked;
  const address = form.address.value.trim();

  const errors = [];

  if (name === "") {
    errors.push("name is required");
  }

  if (toppings.length === 0) {
    errors.push("choose at least one topping");
  }

  if (delivery && address === "") {
    errors.push("address is required for delivery");
  }

  const errorList = document.getElementById("errors");
  errorList.innerHTML = "";

  errors.forEach(error => {
    const li = document.createElement("li");
    li.textContent = error;
    errorList.append(li);
  });

  return {
    name,
    size,
    crust,
    toppings,
    delivery,
    address,
    errors
  };
}
// ===== end problem 3 =====

// ===== problem 4: challenge =====
// Price table from data attributes (10 pts) — passed in browser
function updateTotals(taxRate) {
  const rows = document.querySelectorAll("#cart tbody tr");

  let subtotal = 0;

  rows.forEach(row => {
    const price = Number(row.dataset.price);
    const qty = Number(row.dataset.qty);

    const line = Math.round(price * qty * 100) / 100;

    subtotal += line;

    row.querySelector(".line").textContent = "$" + line.toFixed(2);

    row.dataset.line = line.toFixed(2);

    row.classList.toggle("big", line >= 10);
  });

  subtotal = Math.round(subtotal * 100) / 100;

  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("total").textContent = "$" + total.toFixed(2);

  return total;
}
// ===== end problem 4 =====
