/* HAMBURGER MENU ON MOBILE */

const hamburgerOpen = document.querySelector(".hamburger__button--open");
const hamburgerClose = document.querySelector(".hamburger__button--close");
const hamburgerNavCont = document.querySelector(".hamburger__container");
const hamburgerNavList = document.querySelector(".hamburger__nav");

hamburgerOpen.addEventListener("click", () => {
  hamburgerNavCont.classList.toggle("active");
  hamburgerNavList.classList.toggle("active");
  hamburgerClose.classList.toggle("active");
});

hamburgerClose.addEventListener("click", () => {
  hamburgerNavCont.classList.toggle("active");
  hamburgerNavList.classList.toggle("active");
  hamburgerClose.classList.toggle("active");
});

/* FILTERBOX */

const filterOpen = document.querySelector(".title__filterBtn");

filterOpen.addEventListener("click", function () {
  console.log("Funkar det?");
});

/* FETCH API */

async function fetchApi() {

  const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
  const response = await fetch(url);
  const data = await response.json();
  
  return data.challenges || [];
}


/*async function getChallenges() {
  let challenges = await fetchApi();
  let html = '';

   challenges.forEach(challenge => {
    let challengeCard = `<div class="challengeCard">
                          <img src="${challenge.image}" >
                          <h2>${challenge.description}</h2>
                        </div>`;
    html += challengeCard;
  })

  let container = document.querySelector('.ourChallenges');
  container.innerHTML = html;
} */

/* TEST */
async function getChallenges() {
  let challenges = await fetchApi();
  let html = '';

  challenges.forEach(challenge => {
    let challengeCard = `<div class="challengeCard">
    <img class="rooms__img" src="${challenge.image}" alt="Image of room type">
    <h1>${challenge.title}</h1>
    <div class="rooms__subtitle" aria-label="4 out of 5 stars">
      <div class="rooms__rating">
        <span class="rooms__star--filled"></span>
        <span class="rooms__star--filled"></span>
        <span class="rooms__star--filled"></span>
        <span class="rooms__star--filled"></span>
        <span class="rooms__star--empty"></span>
      </div>
      <span class="rooms__participants">2-6 participants</span>
    </div>
    <p>${challenge.description}</p>
    <button>Book this room</button>
  </div>`;
    html += challengeCard;
  })

  let container = document.querySelector('.ourChallenges');
  container.innerHTML = html;
}


getChallenges();