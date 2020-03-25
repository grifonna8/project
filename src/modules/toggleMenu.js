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

export default toggleMenu;