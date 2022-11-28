// Initialize global variables for scroll detection

let lastKnownScrollPosition = 0;
let ticking = false;

// Initialize array with sections heights

let sections = document.querySelectorAll("section");
let heights = [];

function calculateHeights() {
  let h = 0;
  heights = [];
  sections.forEach(section => {
    heights.push(section.offsetHeight + h);
    h = h + section.offsetHeight;
  });
}

// Allow user to click on project row to scroll to corresponding project

let rows = document.querySelectorAll("tr.project");

for (let i = 0; i < rows.length; i++) {
  rows[i].addEventListener('click', (e) => {
    window.scrollTo({
      top: heights[i] + 25,
      left: 0,
      behavior: 'smooth'
    });
  })
}

// Handle click on logo

let logo = document.querySelector("div.left-pane--logo");

logo.addEventListener('click', (e) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Scroll event listener

document.addEventListener('scroll', (e) => {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      colorBorderBottom(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});

// Color border bottom when scroll is positioned on project section

function colorBorderBottom(scrollPos) {
  // console.log(scrollPos);
  rows.forEach(row => {
    row.style.borderBottomColor = "black";
  });
  if (scrollPos >= 0 && scrollPos < heights[0]) {
    logo.style.borderBottomColor = "white";
  } else {
    console.log("down")
    logo.style.borderBottomColor = "black";
  }
  for (let i = 0; i < sections.length; i++) {
    if (scrollPos > heights[i - 1] && scrollPos < heights[i]) {
      rows[i - 1].style.borderBottomColor = "white";
    }
  }
}

calculateHeights()