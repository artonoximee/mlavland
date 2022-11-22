let section1 = document.getElementById("section-1");
let section2 = document.getElementById("section-2");
let section3 = document.getElementById("section-3");
let section4 = document.getElementById("section-4");

let section1Height = section1.clientHeight
let section2Height = section1Height + section2.clientHeight
let section3Height = section2Height + section3.clientHeight
let section4Height = section3Height + section4.clientHeight

console.log(section1Height, section2Height, section3Height, section4Height)

let row1 = document.getElementById("click-1")
let row2 = document.getElementById("click-2")
let row3 = document.getElementById("click-3")
let row4 = document.getElementById("click-4")

// let clientHeight = document.documentElement.clientHeight;
// let scrollPosition = document.documentElement.scrollTop + clientHeight / 2;

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  console.log(scrollPos);
  row1.style.borderBottomColor = 'black';
  row2.style.borderBottomColor = 'black';
  row3.style.borderBottomColor = 'black';
  row4.style.borderBottomColor = 'black';
  if (scrollPos < section1Height) {
    row1.style.borderBottomColor = 'white';
  }
  if (scrollPos > section1Height && scrollPos < section2Height) {
    row2.style.borderBottomColor = 'white';
  }
  if (scrollPos > section2Height && scrollPos < section3Height) {
    row3.style.borderBottomColor = 'white';
  }
  if (scrollPos > section3Height && scrollPos < section4Height) {
    row4.style.borderBottomColor = 'white';
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

row4.addEventListener('click', (e) => {
  scrollToSection(4);
})

function scrollToSection(num) {
  document.getElementById(`section-${num}`).scrollIntoView({ 
    behavior: 'smooth' 
  })
}