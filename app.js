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
    const cardContainer = document.getElementById("ourChallenges");
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
    card.classList.add("rooms__box");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("rooms__heading");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("rooms__paragraph");
    descriptionElement.textContent = description;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("rooms__rating-container");

    const ratingElement = document.createElement("div");
    ratingElement.classList.add("rooms__rating");
    ratingElement.appendChild(this.generateStarImages(rating));

    const participantsElement = document.createElement("p");
    participantsElement.classList.add("rooms__participants")
    participantsElement.textContent = `${minParticipants} - ${maxParticipants} Participants`;

    detailsContainer.appendChild(ratingElement);
    detailsContainer.appendChild(participantsElement);

/*     const labelsElement = document.createElement("div");
    labelsElement.classList.add("labels");
    labels.forEach((label) => {
      const labelElement = document.createElement("span");
      labelElement.textContent = label;
      labelsElement.appendChild(labelElement);
    }); */

    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = title;
    imageElement.classList.add("rooms__img");

    const bookButton = document.createElement("button");
    bookButton.textContent = "Book this room";
    bookButton.classList.add("rooms__button");

    
    card.appendChild(imageElement);
    card.appendChild(titleElement);
    card.appendChild(detailsContainer);
    card.appendChild(descriptionElement);
    card.appendChild(bookButton);

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

async function getTopThree(apiUrl) {
  try {
    const challenges = await ChallengeCard.createCards(apiUrl);
    const sortedChallenges = challenges.sort((a, b) => b.challenge.rating - a.challenge.rating);
    
    const topThreeChallenges = sortedChallenges.slice(0, 3);

    const topThreeDiv = document.createElement("div");
    topThreeDiv.classList.add("rooms");

    topThreeChallenges.forEach((challengeCard) => {
      topThreeDiv.appendChild(challengeCard.getCardElement());
    });

    return topThreeDiv;
  } catch (error) {
    console.error("Error getting top three challenge cards:", error);
    throw error;
  }
}

async function renderTopThree() {
  const apiUrl = "https://lernia-sjj-assignments.vercel.app/api/challenges";

  try {
    const topThreeDiv = await getTopThree(apiUrl);
    const container = document.querySelector(".rooms");

    if (container) {
      container.appendChild(topThreeDiv);
    }
  } catch (error) {
    console.error("Error rendering top three challenges:", error);
  }
}

// Call the function to render top three challenges
renderTopThree();


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


