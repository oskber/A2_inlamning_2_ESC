/* MODAL */
const book = document.querySelector(".book");
const modalBackground = document.querySelector(".modal");
const modalBtnNextPage = document.querySelectorAll(".modal__btn");
const modalSteps = document.getElementsByClassName("modal__container");
let currentStep = 0;
const modalClose = () => {
  modalBackground.classList.remove("modal--open");
  modalSteps[currentStep].classList.remove("modal--open");
  currentStep = 0;
};

book.addEventListener("click", () => {
  modalBackground.classList.add("modal--open");
  modalSteps[0].classList.add("modal--open");
});
modalBackground.addEventListener("click", (event) => {
  if (event.target === modalBackground) {
    modalClose();
  }
});
modalBtnNextPage.forEach((modalBtnNextPage) => {
  modalBtnNextPage.addEventListener("click", () => {
    if (currentStep === modalSteps.length - 1) {
      modalClose();
    } else {
      modalSteps[currentStep + 1].classList.add("modal--open");
      modalSteps[currentStep].classList.remove("modal--open");
      currentStep += 1;
    }
  });
});
