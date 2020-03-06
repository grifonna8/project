document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  // Timer вариант с setInterval
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    let timer, idInterval;
    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000, /* перевели мс в сек */
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    };

    const timeCheck = () => {
      timer = getTimeRemaining();
    };

    const updateClock = () => {
      timeCheck();
      if (timer.hours >= 0 && timer.hours <=9){
        timerHours.textContent = '0' + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes >= 0 && timer.minutes <=9){
        timerMinutes.textContent = '0' + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds >= 0 && timer.seconds <=9){
        timerSeconds.textContent = '0' + timer.seconds; 
      } else {
        timerSeconds.textContent = timer.seconds;
      }
      if (timer.timeRemaining <= 0){
        clearInterval(idInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    updateClock();
    if(timer.timeRemaining > 0){
      idInterval = setInterval(updateClock, 1000);
    } else {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  };
  countTimer('04 march 2020');
  
  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      // проверка на наличие свойства при первом открытии страницы и дальше при перелючении меню туда-сюда
      // if(!menu.style.transform || menu.style.transform === `translate(-100%)`){
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translate(-100%)`;
      // }

      // вариант с toggle для класса
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  // popup
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
          console.log(width);
          animateRes(0, monitorCenter);
          popupContent.style.left = '0';
        }

      });
    });
    
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

  };

  togglePopup();



});
