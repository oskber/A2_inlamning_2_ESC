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

class APIadapter {
  async fetchChallenges() {
    const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.challenges.map(
      (challengeData) => new ChallengeCard(challengeData)
    );
  }
}

const apiFetcher = new APIadapter();
apiFetcher.fetchChallenges();

class ChallengeCard {
  constructor(data) {
    this.data = data;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = `<div class="rooms__box">
      <img class="rooms__img" src="${this.data.image}" alt="Image of room type">
      <h1 class="rooms__heading">${this.data.title}</h1>
      <div class="rooms__subtitle" aria-label="${this.data.rating}">
        <div class="rooms__rating">
          <span class="rooms__star--filled"></span>
          <span class="rooms__star--filled"></span>
          <span class="rooms__star--filled"></span>
          <span class="rooms__star--filled"></span>
          <span class="rooms__star--empty"></span>
          </div>
          <span class="rooms__participants">${this.data.minParticipants} - ${this.data.maxParticipants} participants</span>
        </div>
        <p class="rooms__paragraph">${this.data.description}</p>
        <button class="rooms__button">Book this room</button>
      </div>`;

    return element;
  }
}

class ViewAll {
  async render(container) {
    const api = new APIadapter();
    const challenges = await api.fetchChallenges();
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}

class top3View {}

class filterBox1 {}

class filterBox2 {}

class booking1 {}

class booking2 {}

const allChallengesDiv = document.querySelector(".ourChallenges");
const view = new ViewAll();
view.render(allChallengesDiv);
