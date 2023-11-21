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


class ChallengeCard {
  constructor(data) {
    this.data = data;
  }

  render() {
    const element = document.createElement("div");
    element.className = "challengeCardBox"
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

class top3View {
  async render(container) {
    const api = new APIadapter();
    const challenges = await api.fetchChallenges();

    const sorted = challenges.sort((a, b) => b.data.rating - a.data.rating);
    for (let i = 0; i < 3; i++) {
      const challenge = sorted[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}

class FilterBox1 {
  constructor() {
    this.filterOpen = document.querySelector(".title__filterBtn");
    this.filterOpen.addEventListener(
      "click",
      this.handleFilterClick.bind(this)
    );
  }

  handleFilterClick() {
    filter__container.style.display = "flex";
  }
}

const filterBox1 = new FilterBox1();
const filter__container = document.querySelector(".filter__container");

class FilterBox2 {}

class Booking1 {}

class Booking2 {}

const allChallengesDiv = document.querySelector(".ourChallenges");
const view = new ViewAll();
view.render(allChallengesDiv);

const top3Div = document.querySelector(".rooms");
const viewTop = new top3View();
viewTop.render(top3Div);