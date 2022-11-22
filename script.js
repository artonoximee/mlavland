let section1 = document.getElementById("section-1");
let section2 = document.getElementById("section-2");
let section3 = document.getElementById("section-3");

let section1Height = section1.clientHeight
let section2Height = section1Height + section2.clientHeight
let section3Height = section2Height + section3.clientHeight

let clientHeight = document.documentElement.clientHeight;

let scrollPosition = document.documentElement.scrollTop + clientHeight / 2;

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  if (scrollPos < section1Height) {
    console.log("Section 1");
  }
  if (scrollPos > section1Height && scrollPos < section2Height) {
    console.log("Section 2");
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

let btn1 = document.getElementById("click-1")
let btn2 = document.getElementById("click-2")
let btn3 = document.getElementById("click-3")

btn1.addEventListener('click', (e) => {
  scrollToSection(1);
})

btn2.addEventListener('click', (e) => {
  scrollToSection(2);
})

btn3.addEventListener('click', (e) => {
  scrollToSection(3);
})

function scrollToSection(num) {
  document.getElementById(`section-${num}`).scrollIntoView({ 
    behavior: 'smooth' 
  })
}