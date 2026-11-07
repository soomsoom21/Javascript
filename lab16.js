// lab: lab-14
// title: The DOM II
// Copied from the lab page. Keep these header lines and the ===== markers.

// ===== problem 1: simple =====
// Add items (10 pts) — passed in browser
function addItems(listId, items) {
  const list = document.getElementById(listId);

  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }

  return list.getElementsByTagName("li").length;
}
// ===== end problem 1 =====

// ===== problem 2: moderate =====
// Product cards (10 pts) — passed in browser
function renderCards(products) {
  const grid = document.getElementById("grid");

  grid.replaceChildren();

  if (products.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No products";
    grid.appendChild(empty);
  } else {
    for (const product of products) {
      const card = document.createElement("div");
      card.className = "card";

      const heading = document.createElement("h3");
      heading.textContent = product.name;

      const price = document.createElement("p");
      price.className = "price";
      price.textContent = "$" + Number(product.price).toFixed(2);

      card.appendChild(heading);
      card.appendChild(price);

      grid.appendChild(card);
    }
  }
}
// ===== end problem 2 =====

// ===== problem 3: complex =====
// Table of contents (10 pts) — passed in browser
function buildToc() {
  const article = document.getElementById("article");
  const toc = document.getElementById("toc");

  toc.replaceChildren();

  let currentSection = null;
  let count = 0;

  const headings = article.querySelectorAll("h2, h3");

  for (const heading of headings) {
    const li = document.createElement("li");
    li.textContent = heading.textContent;

    if (heading.tagName === "H2") {
      toc.appendChild(li);
      currentSection = li;
      count++;
    } else if (heading.tagName === "H3" && currentSection !== null) {
      let subList = currentSection.querySelector("ul");

      if (subList === null) {
        subList = document.createElement("ul");
        currentSection.appendChild(subList);
      }

      subList.appendChild(li);
      count++;
    }
  }

  return count;
}
// ===== end problem 3 =====
