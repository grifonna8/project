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

export default tabs;