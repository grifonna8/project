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
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', (event) => {
      let target = event.target;
      if(target.classList.contains('close-btn')){
        handlerMenu();
      } else {
        target = target.closest('menu');
        if (target){
          menuItems.forEach((elem) =>{
            handlerMenu();
          });
        }
      }
    });

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

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          slider = document.querySelector('.portfolio-content'),
          dotWrapper = document.querySelector('.portfolio-dots');
    let currentSlide = 0, 
        interval, slidesQuant;
        
    slidesQuant = slide.length - 1;
    for(let i = 0; i <= slidesQuant; i++){
      let newDot = document.createElement('li');
      newDot.className = 'dot';
      dotWrapper.appendChild(newDot); 
    }
    let dot = document.querySelectorAll('.dot');
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoplaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time=3000) => {
      interval = setInterval(autoplaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) =>{
      event.preventDefault();
      let target = event.target;

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if (target.matches('#arrow-left')){
        currentSlide--;
      } else if (target.matches('.dot')){
        dot.forEach((elem, index) => {
          if (elem === target){
            currentSlide = index;
          }
        });
      }
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('.portfolio-btn') || 
      event.target.matches('.dot')){
        startSlide();
      }
    });
    startSlide(1500);

  };
  slider();

  // смена картинок в Наша команда
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
  changePictures();

  // валидация полей формы
  const telArr = [...document.querySelectorAll('[type=tel]')],
        nameArr = [...document.querySelectorAll('[placeholder="Ваше имя"]')],
        textField = document.querySelector('[placeholder="Ваше сообщение"]'),
        buttons = [...document.querySelectorAll('[type=submit]')],
        forms = [...document.querySelectorAll('form')];
    
  for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (event) => {
      if (!telArr[i].value.match(/^[\+\]?[0-9]+/g)){
        event.preventDefault();
      }
      if (forms[i].contains(textField) && !textField.value.match(/[ ]+[А-Яа-яЁё]+/g)){
        event.preventDefault();
      }
      if(!nameArr[i].value.match(/[ ]*[А-Яа-яЁё]+/g)){
        event.preventDefault(); 
      }
    })
  }

  // валидация калькулятора
  const validation = () => {
    const square = document.querySelector('.calc-square'),
          count = document.querySelector('.calc-count'),
          day = document.querySelector('.calc-day'),
          calcWrapper = document.querySelector('.calc');

    calcWrapper.addEventListener('input', (event) => {
      if (event.target === square){
        square.value = square.value.replace(/[^0-9]/g, '');
      }
      if (event.target === count){
        count.value = count.value.replace(/[^0-9]/g, '');
      }
      if (event.target === day){
        day.value = day.value.replace(/[^0-9]/g, '');
      }
    });
  };
  validation();

  // калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

      const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
              squareValue = +calcSquare.value;

        if (calcSquare.value.match(/^0{2,}/g)){
          calcSquare.value = 0;
        }
        if (calcCount.value.match(/^0{2,}/g)){
          calcCount.value = 0;
        }
        if (calcDay.value.match(/^0{2,}/g)){
          calcDay.value = 0;
        }
        
        if(calcCount.value > 1){
          countValue += (calcCount.value - 1) / 10;
        }
        if(calcDay.value && calcDay.value < 5){
          dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10){
          dayValue *= 1.5;
        }

        if (typeValue && squareValue){
          total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        } 
        totalValue.textContent = total;
      };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      // 1 способ
      // if(target.matches('.calc-type') || target.matches('.calc-square') || 
      // target.matches('.calc-day') || target.matches('.calc-count')){
      //   console.log(1);
      // }

      // 2 способ
      // if (target === calcType || target === calcSquare || target === calcDay ||
      //   target === calcCount){
      //     console.log(1);
      //   }

      // 3 способ
        if (target.matches('select') || target.matches('input')){
          countSum();
        }
    });
  };
  calc(100);

  // отправка формы AJAX
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
          loadMessage = 'Загрузка',
          successMessage = 'Спасибо, мы скоро с вами свяжемся';

    const form = document.getElementById('form1'),
          form2= document.getElementById('form2'),
          form3= document.getElementById('form3');
    let formArr = [];
    formArr = [form, form2, form3];
    
    for (let item of formArr){
      const statusMessage = document.createElement('div');
      statusMessage.textContent = 'Тут ваше сообщение';
      statusMessage.style.cssText = 'font-size: 2rem; color: wheat';

      item.addEventListener('submit', (event) => {
        event.preventDefault();
        item.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(item);
        let body = {};

        for(let val of formData.entries()){
          body[val[0]] = val[1];
        }
        postData(body, () => {
          statusMessage.textContent = successMessage;
        }, (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
      });

      const postData = (body, outputData, errorData) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
          if(request.readyState !== 4){
            return;
          }
          if (request.status === 200) {
            outputData();
            let itemInputsArr = [...item.querySelectorAll('input')];
            for (let elem of itemInputsArr){
              elem.value = '';
              elem.style.cssText='border: 2px solid grey';
            }
          } else {
            errorData(request.status)
          }
        }) 

        request.open('POST', '../server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
    
        request.send(JSON.stringify(body));
      }



    }
      
  };

  sendForm();

});
