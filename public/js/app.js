const navbar = document.querySelector(".nav");
const logo = document.querySelector("#logo");
const exitNav = document.querySelector(".close-nav");
const loader = document.querySelector('.loader');
const loaderContainer = document.querySelector('.loader-container');
const main = document.querySelector('.main');

// css loader
function init() {
  setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.display = 'none';
      loaderContainer.style.display = 'none';
      main.style.display = 'block';
      setTimeout(() => {
          main.style.opacity = 1
      }, 50)
  }, 4000)
}

init();

function openNav() {
  let navOpen = false;
  if (!navOpen) {
    navbar.classList.add("active");
  }
}

function closeNav() {
  let navOpen = true;
  if (navOpen) {
    navbar.classList.remove("active");
  }
}

logo.addEventListener("click", openNav);
exitNav.addEventListener("click", closeNav);


// debounce logs scrolls only every 20 ms
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const slider = document.querySelectorAll(".slider");

function checkSlide(e) {
    console.log('checking slide');
    console.log(e);
  slider.forEach(slide => {
    // half way through the image
    const slideInAt = window.scrollY + window.innerHeight - slide.clientHeight / 2;
    // bottom of the image
    const imageBottom = slide.offsetTop + slide.clientHeight;
    const isHalfShown = slideInAt > slide.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", debounce(checkSlide));

// typewriter constructor
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};
