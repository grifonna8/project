const formValidation = () => {
  const telArr = [...document.querySelectorAll('[type=tel]')],
  nameArr = [...document.querySelectorAll('[placeholder="Ваше имя"]')],
  textField = document.querySelector('[placeholder="Ваше сообщение"]'),
  buttons = [...document.querySelectorAll('[type=submit]')],
  forms = [...document.querySelectorAll('form')];
  let errorName = true, 
  errorTel = true, 
  errorTextField = true;

  const createErrorTel = (destination) => {
    if (errorTel === true){
    let errorTelVal = document.createElement('div');
    errorTelVal.classList = 'errorTel';
    errorTelVal.innerText = 'Введите телефон, используя + и цифры';
    errorTelVal.style.cssText = `color: red; font-size: 12px; margin-top: -5px;
    z-index: 2; position: relative`;
    telArr[destination].after(errorTelVal);
    errorTel = 0;
    console.log(errorTel);
    return errorTel;
    } else if (errorTel === 0){
      errorTel = true;
      console.log(errorTel);
      let normalChild = document.querySelectorAll('.form-phone')[destination];
      let parent =  normalChild.parentNode;
      let errorChild = parent.children[1];
      console.log(parent);
      parent.removeChild(errorChild);
      return errorTel;
    }
  };

  const createErrorName = (destination) => {
    if (errorName === true){
      let errorNameVal = document.createElement('div');
      errorNameVal.classList = 'errorName';
      errorNameVal.innerText = 'Введите имя кириллицей';
      errorNameVal.style.cssText = `color: red; font-size: 12px; margin-top: -5px; 
      z-index: 2; position: relative`;
      nameArr[destination].after(errorNameVal);
      errorName = 0;
      console.log(errorName);
      return errorName;
    } else if (errorName === 0){
      errorName = true;
      console.log(errorName);
      let normalChild = document.querySelectorAll('.form-name')[destination];
      let parent =  normalChild.parentNode;
      let errorChild = parent.children[1];
      console.log(parent);
      parent.removeChild(errorChild);
      return errorName;
    }
  };

  const createErrorTextField = () => {
    if (errorTextField === true){
      let errorTextFieldVal = document.createElement('div');
      errorTextFieldVal.classList = 'errorTextField';
      errorTextFieldVal.innerText = 'Только кириллицей';
      errorTextFieldVal.style.cssText = `color: red; font-size: 12px; margin-top: -5px; 
      z-index: 2; position: relative`;
      let where = document.querySelector('.mess');
      where.after(errorTextFieldVal);
      errorTextField = 0;
      console.log(errorTextField);
      return errorTextField;
    } else if (errorTextField === 0){
      errorTextField = true;
      console.log(errorTextField);
      let normalChild = document.querySelector('.mess');
      let parent =  normalChild.parentNode;
      let errorChild = parent.children[1];
      console.log(parent);
      parent.removeChild(errorChild);
      return errorTextField;
    }
  };

  for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (event) => {
    if (!telArr[i].value.match(/^[\+\]?[0-9]+$/g)){
      event.preventDefault();
      if (errorTel === true){
      createErrorTel(i);
      }
    } else {
      if (errorTel === 0){
      createErrorTel(i);
      }
    }
    if (forms[i].contains(textField) && !textField.value.match(/[ ]*[А-Яа-яЁё]+$/g)){
      event.preventDefault();
      if (errorTextField === true){
        createErrorTextField();
      } 
    } else {
      if (errorTextField === 0){
      createErrorTextField();
      }
    }
    if(!nameArr[i].value.match(/[ ]*[А-Яа-яЁё]+$/g)){
      event.preventDefault(); 
      if (errorName === true){
      createErrorName(i);
      }
    } else {
      if (errorName === 0){
      createErrorName(i);
      }
    }
  });
  }
};

export default formValidation;
