'use strict';

import calc from "./modules/calc";
import calcValidation from "./modules/calcValidation";
import changePictures from "./modules/changePictures";
import countTimer from "./modules/countTimer";
import formValidation from "./modules/formValidation";
import sendForm from "./modules/sendForm";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";

// Timer вариант с setInterval
countTimer('04 march 2020');

// меню
toggleMenu();

// popup
togglePopup();

// Табы
tabs();

// слайдер
slider();

// смена картинок в Наша команда
changePictures();

// валидация полей формы
formValidation();

// валидация калькулятора
calcValidation();

// калькулятор
calc(100);

// отправка формы AJAX
sendForm();