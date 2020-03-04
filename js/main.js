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
    let animInterval;
  

    console.dir(window);
    console.log(width);
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';

      });
    });

  
  };
  togglePopup();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i){
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      // let target = event.target;
      /* вариант 1 */
      // while (target !== tabHeader){
      //   if(target.classList.contains('service-header-tab')){
      //     tab.forEach((item, i) => {
      //       if(item === target){
      //         toggleTabContent(i);
      //       }
      //     });
      //     return;
      //   }
      //   target = target.parentNode; 
      /* если кликнули на span, то даем ему родителя span, 
        а значит на 2 проходе уже попадем в условие содержит ли service-header-tab*/
      // }

      /* вариант 2 с closest*/
      let target = event.target;
      target = target.closest('.service-header-tab'); /* идет к родителю выше, поднимается по цепочке до 
      документа вверх, если найдет, то вернет тот элемент, который содержит этот селектор, 
      если же совсем ничего нет, то null */

      if(target){
        tab.forEach((item, i) => {
          if(item === target){
            toggleTabContent(i);
          }
        });
      }
      /* если кликнули на span, то даем ему родителя span, 
        а значит на 2 проходе уже попадем в условие содержит ли service-header-tab*/
      // }
      
    });
  };
  tabs();




});
