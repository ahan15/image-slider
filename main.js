import './style.css'

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
      imageArray.push(imageArray[0]); // add first image to end
      imageArray.unshift(imageArray[imageArray.length - 2]);
      console.log(imageArray);
    });
}
fetchImages();