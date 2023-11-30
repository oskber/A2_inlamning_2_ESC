import { Modal } from "./modal.js";

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

      starImage.src = isFilled
        ? "Images/star-filled.svg"
        : isHalf
        ? "Images/star-half-filled.svg"
        : "Images/star-empty.svg";
      starContainer.appendChild(starImage);
    }

    return starContainer;
  }

  typeOfRoom() {
    const typeElement = document.createElement("span");

    if (this.data.type === "onsite") {
      typeElement.classList.add("rooms__type--onsite");
      typeElement.innerHTML = `<i class="fa-solid fa-house"></i>`;
    } else {
      typeElement.classList.add("rooms__type--online");
      typeElement.innerHTML = `<i class="fa-solid fa-laptop-code"></i>`;
    }
    return typeElement;
  }

  typeTag() {
    const typeTag = document.createElement("span");

    if (this.data.type === "onsite") {
      typeTag.innerHTML = "(on-site)";
    } else {
      typeTag.innerHTML = "(networked)";
    }
    return typeTag;
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("rooms__box");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("rooms__heading");
    titleElement.textContent = this.data.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("rooms__description");
    descriptionElement.textContent = this.data.description;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("rooms__rating-container");

    const ratingElement = this.generateStarImages(this.data.rating);
    ratingElement.classList.add("rooms__rating");

    const participantsElement = document.createElement("p");
    participantsElement.classList.add("rooms__participants");
    participantsElement.textContent = `${this.data.minParticipants} - ${this.data.maxParticipants} Participants`;

    const typeTag = this.typeTag(this.data.type);
    typeTag.classList.add("rooms__typeTag");

    detailsContainer.appendChild(ratingElement);
    detailsContainer.appendChild(participantsElement);
    titleElement.appendChild(typeTag);

    const imageElement = document.createElement("img");
    imageElement.src = this.data.image;
    imageElement.alt = this.data.title;
    imageElement.classList.add("rooms__img");

    const bookButton = document.createElement("button");
    bookButton.textContent = "Book this room";
    bookButton.classList.add("rooms__button");
    
    const modal = new Modal();
    modal.create();
    bookButton.addEventListener("click", () => {
      modal.open(this.data.title);
    })

    const typeElement = this.typeOfRoom(this.data.type);

    card.appendChild(imageElement);
    card.appendChild(titleElement);
    card.appendChild(detailsContainer);
    card.appendChild(descriptionElement);
    card.appendChild(bookButton);
    card.appendChild(typeElement);

    return card;
  }
}

// FETCH API
class APIadapter {
  async fetchAllChallenges() {
    const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url);
    const data = await response.json();
    
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

      topThree.forEach((challengeCard) => {
        const element = challengeCard.render();
        container.append(element);
      });
    } catch (error) {
      console.error("Error rendering Top 3 challenges:", error);
    }
  }
}

class FilterBoxOpenAndClose {
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

const filterBox1 = new FilterBoxOpenAndClose();

class FilterByType {
  constructor() {
    this.onlineCheckbox = document.querySelector("#onlineChallengeCheckbox");
    this.onsiteCheckbox = document.querySelector("#onsiteChallengeCheckbox");

    this.onlineCheckbox.addEventListener("change", () => {
      this.filterChallengesByType();
    });

    this.onsiteCheckbox.addEventListener("change", () => {
      this.filterChallengesByType();
    });
  }

  filterChallengesByType() {
    const onlineChecked = this.onlineCheckbox.checked;
    const onsiteChecked = this.onsiteCheckbox.checked;

    const challengesContainer = document.querySelector("#ourChallenges");
    const api = new APIadapter();

    api.fetchAllChallenges().then((challenges) => {
      let filteredChallenges;

      if (!onlineChecked && !onsiteChecked) {
        // No checkboxes are checked, show all challenges
        filteredChallenges = challenges;
      } else {
        // Filter challenges
        filteredChallenges = challenges.filter((challenge) => {
          return (
            (onlineChecked && challenge.data.type === "online") ||
            (onsiteChecked && challenge.data.type === "onsite")
          );
        });
      }

      // Clear challenges
      challengesContainer.innerHTML = "";

      // Render challenges
      filteredChallenges.forEach((challenge) => {
        const element = challenge.render();
        challengesContainer.appendChild(element);
      });
    });
  }
}

const filterBox2 = new FilterByType();

class FilterByTags {
  constructor() {
    this.tagsContainer = document.querySelector(".filter__selection__tags");
    this.tagsFilter = [];

    this.fetchTags();
    this.selectedTags = [];

    // Add an event listener for clearing selected tags
    //const clearTagsButton = document.querySelector(".filter__selection__tags__clear");
    //clearTagsButton.addEventListener("click", () => {
    //this.selectedTags = [];
    //this.updateTagButtons();
    //this.filterChallengesByTags();
    //});
  }

  async fetchTags() {
    try {
      const api = new APIadapter();
      const challenges = await api.fetchAllChallenges();

      challenges.forEach((challenge) => {
        challenge.data.labels.forEach((label) => {
          if (!this.tagsFilter.includes(label)) {
            this.tagsFilter.push(label);
            this.createTagButton(label);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }

  createTagButton(label) {
    const button = document.createElement("button");
    button.textContent = label;
    button.classList.add("filter__selection__tags__button");

    button.addEventListener("click", () => {
      this.toggleTagSelection(label);
    });

    if (this.selectedTags.includes(label)) {
      button.classList.add("selected");
    }

    this.tagsContainer.appendChild(button);
  }

  toggleTagSelection(label) {
    // Toggle the selection state of the tag
    if (this.selectedTags.includes(label)) {
      this.selectedTags = this.selectedTags.filter((tag) => tag !== label);
    } else {
      this.selectedTags.push(label);
    }

    // Update the appearance of tag buttons
    this.updateTagButtons();

    // Filter challenges based on the selected tags
    this.filterChallengesByTags();
  }

  updateTagButtons() {
    // Update the appearance of tag buttons based on the selected state
    const tagButtons = document.querySelectorAll(
      ".filter__selection__tags__button"
    );
    tagButtons.forEach((button) => {
      const label = button.textContent;
      if (this.selectedTags.includes(label)) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }

  filterChallengesByTags() {
    const challengesContainer = document.querySelector("#ourChallenges");
    const api = new APIadapter();

    api.fetchAllChallenges().then((challenges) => {
      let filteredChallenges;

      if (this.selectedTags.length === 0) {
        // No tags are selected, show all challenges
        filteredChallenges = challenges;
      } else {
        // Filter challenges based on selected tags
        filteredChallenges = challenges.filter((challenge) => {
          return this.selectedTags.every((tag) =>
            challenge.data.labels.includes(tag)
          );
        });
      }

      // Clear challenges
      challengesContainer.innerHTML = "";

      // Render challenges
      filteredChallenges.forEach((challenge) => {
        const element = challenge.render();
        challengesContainer.appendChild(element);
      });
    });
  }
}

const filterByTags = new FilterByTags();

// class Booking1 {}

// class Booking2 {}

class FilterByRating {
  constructor() {
    this.ratingCheckboxRow1 = document.querySelectorAll(
      "[name='rating_row_1']"
    );

    this.ratingCheckboxRow2 = document.querySelectorAll(
      "[name='rating_row_2']"
    );

    this.ratingCheckboxRow1.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.filterChallengesByRating();
      });
    });

    this.ratingCheckboxRow2.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.filterChallengesByRating();
      });
    });
  }

  filterChallengesByRating() {
    const challengesContainer = document.querySelector("#ourChallenges");

    const api = new APIadapter();

    api.fetchAllChallenges().then((challenges) => {
      const selectedRatingRow1 = Array.from(this.ratingCheckboxRow1).find(
        (checkbox) => checkbox.checked
      );

      const selectedRatingRow2 = Array.from(this.ratingCheckboxRow2).find(
        (checkbox) => checkbox.checked
      );

      const ratingRow1 = selectedRatingRow1
        ? parseFloat(selectedRatingRow1.value)
        : 0;

      const ratingRow2 = selectedRatingRow2
        ? parseFloat(selectedRatingRow2.value)
        : 0;

      let filteredChallenges;

      if (ratingRow1 === 0 && ratingRow2 === 0) {
        // No ratings are selected, show all challenges

        filteredChallenges = challenges;
      } else {
        // Filter challenges based on the selected ratings

        filteredChallenges = challenges.filter((challenge) => {
          const challengeRating = challenge.data.rating;

          return (
            (ratingRow1 === 0 || challengeRating >= ratingRow1) &&
            (ratingRow2 === 0 || challengeRating <= ratingRow2)
          );
        });
      }

      // Clear challenges

      challengesContainer.innerHTML = "";

      // Render challenges

      filteredChallenges.forEach((challenge) => {
        const element = challenge.render();
        challengesContainer.appendChild(element);
      });
    });
  }
}

const filterByRating = new FilterByRating();

class FilterByName {
  constructor() {
    this.nameInput = document.querySelector("#challengeNameInput");
    this.nameInput.addEventListener("input", () => {
      this.filterChallengesByName();
    });
  }

  filterChallengesByName() {
    const challengesContainer = document.querySelector("#ourChallenges");
    const api = new APIadapter();

    const nameFilter = this.nameInput.value.toLowerCase();

    api.fetchAllChallenges().then((challenges) => {
      const filteredChallenges = challenges.filter((challenge) => {
        const challengeTitle = challenge.data.title.toLowerCase();
        const challengeDescription = challenge.data.description.toLowerCase();
        return (
          challengeTitle.includes(nameFilter) ||
          challengeDescription.includes(nameFilter)
        );
      });

      // Clear challenges
      challengesContainer.innerHTML = "";

      // Render challenges
      filteredChallenges.forEach((challenge) => {
        const element = challenge.render();
        challengesContainer.appendChild(element);
      });
    });
  }
}

const filterByName = new FilterByName();
