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

// FETCH API

class ApiHandler {
  static async fetchData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Kunde inte ladda data :(", error);
      throw error;
    }
  }
}

// DOM CONTENT LOADER

document.addEventListener("DOMContentLoaded", () => {
  ChallengeCard.createCards(
    "https://lernia-sjj-assignments.vercel.app/api/challenges"
  ).then((challengeCards) => {
    const cardContainer = document.getElementById("ourChallenge");
    if (cardContainer) {
      cardContainer.innerHTML = "";
      challengeCards.forEach((challengeCard) => {
        cardContainer.appendChild(challengeCard.getCardElement());
      });
    }
  });
});

// CARDS

class ChallengeCard {
  constructor(challenge) {
    this.challenge = challenge;
    this.cardElement = this.createCard();
  }

  generateStarImages(rating) {
    const maxStars = 5;
    const roundedRating = Math.round(rating);
    const starContainer = document.createElement("div");

    for (let i = 1; i <= maxStars; i++) {
      const starImage = document.createElement("img");
      starImage.src =
        i <= roundedRating ? "Images/star-filled.png" : "Images/star-empty.png";
      starContainer.appendChild(starImage);
    }

    return starContainer;
  }

  createCard() {
    const {
      id,
      title,
      description,
      rating,
      minParticipants,
      maxParticipants,
      labels,
      image,
    } = this.challenge;

    const card = document.createElement("div");
    card.id = id;
    card.classList.add("card");
    card.classList.add("rooms__box");

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("rating-container");

    const ratingElement = document.createElement("div");
    ratingElement.classList.add("rating");
    ratingElement.appendChild(this.generateStarImages(rating));

    const participantsElement = document.createElement("p");
    participantsElement.textContent = `Participants: ${minParticipants} - ${maxParticipants}`;

    detailsContainer.appendChild(ratingElement);
    detailsContainer.appendChild(participantsElement);

    const labelsElement = document.createElement("div");
    labelsElement.classList.add("labels");
    labels.forEach((label) => {
      const labelElement = document.createElement("span");
      labelElement.textContent = label;
      labelsElement.appendChild(labelElement);
    });

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title;
    imageElement.classList.add("rooms__img");

    card.appendChild(imageElement);
    card.appendChild(titleElement);
    card.appendChild(detailsContainer);
    card.appendChild(descriptionElement);
    card.appendChild(labelsElement);

    return card;
  }

  getCardElement() {
    return this.cardElement;
  }

  static async fetchData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Kunde inte ladda korten :(", error);
      throw error;
    }
  }

  static async createCards(apiUrl) {
    try {
      const apiData = await ChallengeCard.fetchData(apiUrl);
      return apiData.challenges.map(
        (challenge) => new ChallengeCard(challenge)
      );
    } catch (error) {
      console.error("Kunde inte ladda korten :(", error);
      throw error;
    }
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

class Top3View {
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
    this.filter__container = document.querySelector(".filter__container");

    this.filterOpen.addEventListener("click", () => {
      // Open the filtermenu
      this.filter__container.style.display = "flex";
      this.filterOpen.style.display = "none";
    });

    const filter__button__close = document.querySelector(
      ".filter__button--close"
    );

    filter__button__close.addEventListener("click", () => {
      this.closeFilterMenu();
    });
  }

  closeFilterMenu() {
    // Close the filtermenu
    this.filter__container.style.display = "none";
    this.filterOpen.style.display = "block";
  }
}

const filterBox1 = new FilterBox1();

class FilterBox2 {}

class Booking1 {}

class Booking2 {}

/*DOM*/

const allChallengesDiv = document.querySelector(".ourChallenges");
const view = new ViewAll();
view.render(allChallengesDiv);


const top3Div = document.querySelector(".rooms");
const viewTop = new top3View();
viewTop.render(top3Div);