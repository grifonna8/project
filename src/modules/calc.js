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

export default calc;