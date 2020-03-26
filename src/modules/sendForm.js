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
      postData(body)
          .then ((response) => {
            if (response.status !== 200){
              throw new Error ('not 200');
            }
            statusMessage.textContent = successMessage;
            const messageHide = setTimeout(function(){
              statusMessage.textContent = '';
            },6000);            
            let itemInputsArr = [...item.querySelectorAll('input')];
              for (let elem of itemInputsArr){
                elem.value = '';
              }
          }) 
          .catch ((error) => {
            statusMessage.textContent = errorMessage;
          });
    });

    const postData = (body) => {
      return fetch ('../server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

  }
    
};

export default sendForm;