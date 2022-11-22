let section1 = document.getElementById("section-1");
let section2 = document.getElementById("section-2");
let section3 = document.getElementById("section-3");

let section1Height = section1.clientHeight
let section2Height = section1Height + section2.clientHeight
let section3Height = section2Height + section3.clientHeight

let row1 = document.getElementById("click-1")
let row2 = document.getElementById("click-2")
let row3 = document.getElementById("click-3")

// let clientHeight = document.documentElement.clientHeight;

// let scrollPosition = document.documentElement.scrollTop + clientHeight / 2;

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  row1.style.borderBottomColor = 'black';
  row2.style.borderBottomColor = 'black';
  row3.style.borderBottomColor = 'black';
  if (scrollPos < section1Height) {
    row1.style.borderBottomColor = 'white';
  }
  if (scrollPos > section1Height && scrollPos < section2Height) {
    row2.style.borderBottomColor = 'white';
  }
  if (scrollPos > section2Height && scrollPos < section3Height) {
    row3.style.borderBottomColor = 'white';
  }
}

document.addEventListener('scroll', (e) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

row1.addEventListener('click', (e) => {
  scrollToSection(1);
})

row2.addEventListener('click', (e) => {
  scrollToSection(2);
})

row3.addEventListener('click', (e) => {
  scrollToSection(3);
})

function scrollToSection(num) {
  document.getElementById(`section-${num}`).scrollIntoView({ 
    behavior: 'smooth' 
  })
}