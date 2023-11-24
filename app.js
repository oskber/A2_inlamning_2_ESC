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

/* ADD TO DOM */
document.addEventListener("DOMContentLoaded", async () => {
  const challengesDiv = document.getElementById("ourChallenges");
  if (challengesDiv != null) {
    let view = new ViewAll();
    await view.render(challengesDiv);
  }
  const topThreeDiv = document.querySelector(".rooms");
  if (topThreeDiv != null) {
    let topThreeView = new ViewTopThree();
    await topThreeView.render(topThreeDiv);
  }
});

class ChallengeCard {
  constructor(data) {
    this.data = data;
  }

  generateStarImages(rating) {
    const maxStars = 5;
    const starContainer = document.createElement("div");

    for (let i = 1; i <= maxStars; i++) {
      const starImage = document.createElement("img");
      const isFilled = i <= rating;
      const isHalf = i - 0.5 === rating;

      starImage.src = isFilled? "Images/star-filled.svg": isHalf? "Images/star-half-filled.svg": "Images/star-empty.svg";
      starContainer.appendChild(starImage);
    }

    return starContainer;
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("rooms__box");

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.data.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = this.data.description;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("rooms__rating-container");
    

    const ratingElement = this.generateStarImages(this.data.rating);
    ratingElement.classList.add("rooms__rating");

    const participantsElement = document.createElement("p");
    participantsElement.classList.add("rooms__participants");
    participantsElement.textContent = `${this.data.minParticipants} - ${this.data.maxParticipants} Participants`;

    const typeOfRoom = document.createElement("p");
    typeOfRoom.type = `Type: ${this.data.type}`;

    detailsContainer.appendChild(ratingElement);
    detailsContainer.appendChild(participantsElement);
    detailsContainer.appendChild(typeOfRoom);

    const imageElement = document.createElement("img");
    imageElement.src = this.data.image;
    imageElement.alt = this.data.title;
    imageElement.classList.add("rooms__img");

    const bookButton = document.createElement("button");
    bookButton.textContent = "Book this room";
    bookButton.classList.add("rooms__button");

    card.appendChild(imageElement);
    
    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
    card.appendChild(detailsContainer);

    return card;
  }
}

// FETCH API
class APIadapter {
  async fetchAllChallenges() {
    const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched Challenges:", data);

    return data.challenges.map(
      (challengeData) => new ChallengeCard(challengeData)
    );
  }
}

class ViewAll {
  async render(container) {
    try {
      const api = new APIadapter();
      const challenges = await api.fetchAllChallenges();
      console.log("All Challenges:", challenges);

      challenges.forEach((challenge) => {
        const element = challenge.render();
        container.appendChild(element);
      });
    } catch (error) {
      console.error("Error rendering all challenges:", error);
    }
  }
}

class ViewTopThree {
  async render(container) {
    try {
      const api = new APIadapter();
      const challenges = await api.fetchAllChallenges();

      const sorted = challenges.sort((a, b) => b.data.rating - a.data.rating);
      const topThree = sorted.slice(0, 3);

      console.log("Top Three Challenges:", topThree);

      topThree.forEach((challengeCard) => {
        const element = challengeCard.render();
        container.append(element);
      });
    } catch (error) {
      console.error("Error rendering Top 3 challenges:", error);
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
      ".filter__closeButton"
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
