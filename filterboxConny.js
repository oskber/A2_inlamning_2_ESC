//Inaktiv

/* const ratingsRow1 = document.querySelectorAll('.filter__selection__stars__row_1 input');
const ratingsRow2 = document.querySelectorAll('.filter__selection__stars__row_2 input');

let lastClickedIndexRow1 = -1;

function ratingChange(selectedRating, row, clickedIndex) {
  let text;

  if (selectedRating === '1') {
    text = 'star';
  } else {
    text = 'stars';
  }

  console.log(`${selectedRating} ${text} selected in row ${row}`);
}

function handleRowClick(row, clickedIndex) {
  const ratings = row === 1 ? ratingsRow1 : ratingsRow2;

  ratings.forEach((rating, index) => {
    if (index <= clickedIndex) {
      rating.checked = true;
    } else {
      rating.checked = false;
    }
  });
}



function handleRatingChange(rating, index) {
  const selectedRating = rating.value;
  lastClickedIndexRow1 = index;
  ratingChange(selectedRating, 1, lastClickedIndexRow1);
  handleRowClick(2, lastClickedIndexRow1);
}

function handleRatingChangeRow1(rating, index) {
  rating.addEventListener('change', function () {
    handleRatingChange(rating, index);
  });
}

ratingsRow1.forEach(function (rating, index) {
  handleRatingChangeRow1(rating, index);
});





ratingsRow2.forEach(function (rating, index) {
  rating.addEventListener('change', function () {
    const selectedRating = this.value;
    if (index > lastClickedIndexRow1) {
      lastClickedIndexRow1 = index;
    }
    ratingChange(selectedRating, 2, index);
  });
});
 */


/* const filter__closeButton__container = document.querySelector('.filter__closeButton__container');
const filter__closeButton = document.querySelector('.filter__closeButton');

filter__closeButton__container.addEventListener('click' function () {
  filter__closeButton.classList.toggle('active');
}); */



