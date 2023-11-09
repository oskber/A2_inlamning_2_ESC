const hamburgerOpen = document.querySelector('.hamburger__button--open');
const hamburgerClose = document.querySelector('.hamburger__button--close');
const hamburgerNavCont = document.querySelector('.hamburger__nav__container');
const hamburgerNavList = document.querySelector('.hamburger__nav');

hamburgerOpen.addEventListener('click', () => {
  hamburgerNavCont.classList.toggle("active");
  hamburgerNavList.classList.toggle("active");
  hamburgerClose.classList.toggle("active");
})

hamburgerClose.addEventListener('click', () => {
  hamburgerNavCont.classList.toggle("active");
  hamburgerNavList.classList.toggle("active");
  hamburgerClose.classList.toggle("active");
})