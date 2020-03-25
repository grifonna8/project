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

export default countTimer;