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
    heights.push(section.scrollHeight + h);
    h = h + section.scrollHeight;
  });
  // console.log(heights);
}

// Allow user to click on project row to scroll to corresponding project

let rows = document.querySelectorAll("tr.project");

for (let i = 0; i < rows.length; i++) {
  rows[i].addEventListener('click', (e) => {
    calculateHeights();
    window.scrollTo({
      top: heights[i] + 24 + i * 2.3,
      left: 0,
      behavior: 'smooth'
    });
  })
}

// Handle click on logo

let logo = document.querySelector("div.left-pane--logo");

logo.addEventListener('click', (e) => {
  calculateHeights();
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
    logo.style.borderBottomColor = "black";
  }
  for (let i = 0; i < sections.length; i++) {
    if (scrollPos > heights[i - 1] && scrollPos < heights[i]) {
      rows[i - 1].style.borderBottomColor = "white";
    }
  }
}

// Carousel (this is not a carousel)

let carousels = document.querySelectorAll("div.carousel")

carousels.forEach(carousel => {
  let imgs = []
  let i = 0
  for (const child of carousel.children) {
    imgs.push(child);
  }
  carousel.innerHTML = "";
  carousel.appendChild(imgs[i]);
  carousel.addEventListener('click', (e) => {
    if (i + 1 < imgs.length) {
      carousel.innerHTML = "";
      i = i + 1
      carousel.appendChild(imgs[i]);
    } else if (i+1 == imgs.length) {
      carousel.innerHTML = "";
      i = 0;
      carousel.appendChild(imgs[i]);
    }
  })
})