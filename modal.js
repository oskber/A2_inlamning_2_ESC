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

/* FETCH API BOOKING 1 */
const dateField = document.querySelector(".modal__date");
dateField.setAttribute("min", new Date().toISOString().split('T')[0]);
let timeSlots;
async function getAvailableTimes(date) {
  const res = await fetch(
    `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=3`
    // Todo: Ändra "challenge=3" efter att bokningsknappen lagts till på korten
  );
  const data = await res.json();
  return data.slots;
}
dateField.addEventListener("change", (event) => {
  if (event.target.value === "") {
    searchBtn.disabled = true;
  } else {
    searchBtn.disabled = false;
  }
});
const searchBtn = document.querySelector(".modal__searchBtn");
searchBtn.disabled = true; // Knappen är disabled för att man inte ska kunna gå vidare till nästa steg utan att välja ett datum
searchBtn.addEventListener("click", () => {
  const date = dateField.value;
  timeSlots = getAvailableTimes(date);
});
