import './style.css'

const slide = document.querySelector('.slide');
const root = document.querySelector(':root');
let slideIndex = 1;

function processImages(item) {
  return `<img src="${item.url}" alt="${item.alt}">`;
}

function moveSlides() {
  slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  const slidesArray = [...slide.querySelectorAll('img')];
  root.style.setProperty('--slide-progress', `${(100 / (slidesArray.length - 3)) * (slideIndex - 1)}%`);
}

// move when clicked
function moveHandler(direction) {
  slide.style.transition = `transform 450ms ease-in-out`;
  direction !== 'right' ? (slideIndex -= 1) : (slideIndex += 1);
  moveSlides();
}


// fetch images
async function fetchImages() {
  await fetch('images.json')
    .then((response) => {
      if(!response.ok) {
        throw new Error('Network response was not okay');
      }
      return response.json();
    })
    .then((imageArray) => {
      // clone first and last image
      imageArray.push(imageArray[0]); 
      imageArray.unshift(imageArray[imageArray.length - 2]);
      // show slider
      slide.innerHTML = imageArray.map(processImages).join('');
      moveSlides();
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    })
}
fetchImages();

// click right btn
document.querySelector('.slider__btn--right').addEventListener('click', () => {
  moveHandler('right');
});

// click left btn
document.querySelector('.slider__btn--left').addEventListener('click', () => {
  moveHandler();
});