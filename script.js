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
let windowWidth = window.innerWidth;

for (let i = 0; i < rows.length; i++) {
  rows[i].addEventListener('click', (e) => {
    calculateHeights();
    if (windowWidth > 925) {
      window.scrollTo({
        top: heights[i] + 24 + i * 2.3,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      closeMobileMenu();
      window.scrollTo({
        top: heights[i] + i * 2.58,
        left: 0,
        behavior: 'smooth'
      });
    }
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

// Mobile menu

let mobileLogo = document.querySelector("div.right-pane--logo");
let projectsTable = document.querySelector("table.left-pane--projects-list");
let topGradient = document.querySelector("div.top-gradient");
let bottomGradient = document.querySelector("div.bottom-gradient");
let backdrop = document.querySelector("div.backdrop");

function openMobileMenu() {
  projectsTable.style.display = "block";
  backdrop.style.display = "block"
  // topGradient.style.display = "none";
  // bottomGradient.style.display = "none";
}

function closeMobileMenu() {
  projectsTable.style.display = "none";
  backdrop.style.display = "none"
  // topGradient.style.display = "block";
  // bottomGradient.style.display = "block";
}

mobileLogo.addEventListener('click', (e) => {
  if (projectsTable.style.display === "block") {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
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
    row.style.borderBottomColor = "rgba(0,0,0,0)";
  });
  if (scrollPos >= 0 && scrollPos < heights[0]) {
    logo.style.borderBottomColor = "white";
    mobileLogo.style.borderBottomColor = "white";
  } else {
    logo.style.borderBottomColor = "black";
    mobileLogo.style.borderBottomColor = "rgba(0,0,0,0)";
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

calculateHeights();

// Opacity decrease

function decreaseOpacity() {
  var currentOpacity = parseFloat(document.body.style.opacity || 1);
    if (currentOpacity == 0) {
    } else {
      currentOpacity -= 0.1;
    }
    document.body.style.opacity = currentOpacity;
}

function setOpacityToOne() {
  document.body.style.opacity = 1;
}

var opacityInterval = setInterval(decreaseOpacity, 1000);
document.addEventListener('mousemove', setOpacityToOne);
window.addEventListener('scroll', setOpacityToOne);