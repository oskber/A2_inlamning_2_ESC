// Väljer alla matchande element med querySelectorAll.
const ratingsRow1 = document.querySelectorAll('.filter__selection__stars__row_1 input');
const ratingsRow2 = document.querySelectorAll('.filter__selection__stars__row_2 input');

//För att hålla reda på det senaste klickade indexet på första raden stjärnor
let lastClickedIndexRow1 = -1;

//Tar emot betyget och loggar stjärnor i singular eller plural beroende på antal.
function ratingChange(selectedRating, row, clickedIndex) {
  let text;

  if (selectedRating === '1') {
    text = 'star';
  } else {
    text = 'stars';
  }

  console.log(`${selectedRating} ${text} selected in row ${row}`);
}

//Går igenom alla stjärnor. Väljer man inte rad 1 så är det rad 2.
function handleRowClick(row, clickedIndex) {
  const ratings = row === 1 ? ratingsRow1 : ratingsRow2;

  //Om index (stjärnor) är mindre eller lika med den man klickade på så tänds alla stjärnor till vänster om den.
  ratings.forEach((rating, index) => {
    if (index <= clickedIndex) {
      rating.checked = true;
    } else {
      rating.checked = false;
    }
  });
}

//Går igenom varje stjärna i första raden (forEach) och sparar värdet (this.value) av de stjärnor som ändrades. Sparar positionen (index). Funktionen ratingChange skickar med det valda betyget på rad 1. Funktionen handleRowClick uppdaterar rad 2 med stjärnor baserat på antalet stjärnor klickade på rad 1. 
ratingsRow1.forEach((rating, index) => {
  rating.addEventListener('change', function () {
    const selectedRating = this.value;
    lastClickedIndexRow1 = index;
    ratingChange(selectedRating, 1, lastClickedIndexRow1);
    handleRowClick(2, lastClickedIndexRow1);
  });
});


//if-satsen kollar om nuvarande stjärnan (index) är till höger om den senaste klickade stjärnan på rad 1 för att uppdatera indexet. ratingChange tar emot betyget (selectedRating) på rad 2 (2) och uppdarerar stjärnan som ändrades (index) och skickar dessa till funktionen ratingChange ovan för att logga betyget.
ratingsRow2.forEach((rating, index) => {
  rating.addEventListener('change', function () {
    const selectedRating = this.value;
    if (index > lastClickedIndexRow1) {
      lastClickedIndexRow1 = index;
    }
    ratingChange(selectedRating, 2, index);
  });
});
