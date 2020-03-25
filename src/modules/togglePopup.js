const togglePopup = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content'),
        width = document.documentElement.clientWidth;
  let monitorCenter, popupContentWidth;
  
  // let popupAnimate = () => {
  //   popupContent.style.left = '0';
  //     animInterval = requestAnimationFrame(popupAnimate);
  //     for(let i = 0; i <= width / 2; i++){
  //       popupContent.style.left = i + 'px';
  //     }
  // };

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      function animate(draw, duration=1200){
        let startTime = performance.now();
        function step(currentTime){
          let progress = (currentTime - startTime) / duration;
          draw(progress);
          if(progress < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
      }
      function animateRes(begin, end){
        animate(
          (progress) => {
            popupContent.style.left = Math.ceil((end - begin) * progress + begin) + 'px';
          }
        );
      }
      popupContentWidth = popupContent.offsetWidth;
      monitorCenter = width / 2 - popupContentWidth / 2;
      if(width > 768){
        animateRes(0, monitorCenter);
        popupContent.style.left = '0';
      }

    });
  });
  
  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });

};

export default togglePopup;