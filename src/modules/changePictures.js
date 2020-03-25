const changePictures = () => {
  const photos = document.querySelectorAll('[data-img]'),
        commandWrapper = document.querySelector('.command'),
        address = [];

  photos.forEach((item) => {
    address.push(item.src);
  });

  commandWrapper.addEventListener('mouseover', (event) => {
    photos.forEach((item) => {
      if (event.target === item){
        item.src = item.dataset.img;
      }
    });
  });
  commandWrapper.addEventListener('mouseout', (event) => {
    Array.from(photos);
    for (let i = 0; i < photos.length; i++){
      if (event.target === photos[i]){
        photos[i].src = address[i];
      }
    }
    
  });
};

export default changePictures;