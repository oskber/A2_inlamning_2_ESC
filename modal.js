/* Variables */
let challengeId;
let timeSlots;

/* MODAL */
export class Modal {
  constructor() {
    this.modalSteps = document.getElementsByClassName("modal__container");
    this.modalBackground = document.querySelector(".modal");
  }
  renderTitle(title) {
    const modalOneTitle = document.querySelector("#modal__stepOneTitle");
    const modalTwoTitle = document.querySelector("#modal__stepTwoTitle");
    modalOneTitle.textContent = `Book room ${title} (step 1)`;
    modalTwoTitle.textContent = `Book room ${title} (step 2)`;
  }
  open(title, id) {
    challengeId = id;
    const modalBtnNextPage = document.querySelectorAll(".modal__btn");
    let currentStep = 0;
    const modalClose = () => {
      this.modalBackground.classList.remove("modal--open");
      this.modalSteps[currentStep].classList.remove("modal--open");
      currentStep = 0;
    };
    this.modalBackground.addEventListener("click", (event) => {
      if (event.target === this.modalBackground) {
        modalClose();
      }
    });
    modalBtnNextPage.forEach((modalBtnNextPage) => {
      modalBtnNextPage.addEventListener("click", () => {
        if (currentStep === this.modalSteps.length - 1) {
          modalClose();
        } else {
          this.modalSteps[currentStep + 1].classList.add("modal--open");
          this.modalSteps[currentStep].classList.remove("modal--open");
          currentStep += 1;
        }
      });
    });
    this.renderTitle(title);
    this.modalBackground.classList.add("modal--open");
    this.modalSteps[0].classList.add("modal--open");
  }
}

/* FETCH API BOOKING 1 and 2 */
const dateField = document.querySelector(".modal__date");
const searchBtn = document.querySelector(".modal__searchBtn");

const dateInput = document.querySelector(".modal__date");
const timeSelect = document.querySelector("#whatTime");

function clearOptions() {
  // Remove all child nodes from the time select element
  while (timeSelect.firstChild) {
    timeSelect.removeChild(timeSelect.firstChild);
  }
}

function createOption(timeSlot) {
  const option = document.createElement("option");
  option.textContent = timeSlot;
  timeSelect.appendChild(option);
}

// Event listener for date input change
dateInput.addEventListener("change", () => {
  // Clear existing options before adding new ones
  clearOptions();
});

dateField.setAttribute("min", new Date().toISOString().split("T")[0]);
async function getAvailableTimes() {
  const date = dateField.value;
  const res = await fetch(
    `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=${challengeId}`
  );
  const data = await res.json();
  timeSlots = data.slots;
  timeSlots.forEach((timeSlot) => createOption(timeSlot));   // Use forEach to create options for each time slot

}
dateField.addEventListener("change", (event) => {
  if (event.target.value === "") {
    searchBtn.disabled = true;
  } else {
    searchBtn.disabled = false;
  }
});
searchBtn.disabled = true; // Knappen är disabled för att man inte ska kunna gå vidare till nästa steg utan att välja ett datum
searchBtn.addEventListener("click", () => {
  getAvailableTimes();
});
