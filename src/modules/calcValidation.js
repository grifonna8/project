const calcValidation = () => {
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

export default calcValidation;