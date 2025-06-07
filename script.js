let hamburger = document.querySelector(".hamburger");
let cross = document.querySelector(".cross");
let menu_list = document.querySelector(".menu-list");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("-translate-x-96");
  cross.classList.remove("-translate-y-96");
  cross.classList.add("-translate-y-12");
  menu_list.classList.toggle("-translate-x-full");
  console.log("i am clicked");
});
cross.addEventListener("click", () => {
  hamburger.classList.toggle("-translate-x-96");
  cross.classList.remove("-translate-y-12");
  cross.classList.add("-translate-y-96");
  menu_list.classList.toggle("-translate-x-full");
  console.log("i am clicked");
});

var typed = new Typed(".web-dev", {
  strings: ["Web Developer", "Student"],
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 500,
  loop: true,
});
