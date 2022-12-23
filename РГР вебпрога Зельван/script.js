'use strict'

let popUp = [];

popUp[0] = {
  isOpen: false,
  class: '.color-font',
}

popUp[1] = {
  isOpen: false,
  class: '.color-back',
}

popUp[2] = {
  isOpen: false,
  class: '.font-size',
}

popUp[3] = {
  isOpen: false,
  class: '.page-list',
}

let pageNumber = 1;

document.querySelector('.color-back__button').onclick = function() { //здесь и ниже нажатия на кнопки меню
  if (popUp[1].isOpen) {
    closePopUps();
  } else {
    closePopUps();
    openPopUp('.color-back');
    popUp[1].isOpen = true;
  }
}

document.querySelector('.color-font__button').onclick = function() {
  if (popUp[0].isOpen) {
    closePopUps();
  } else {
    closePopUps();
    openPopUp('.color-font');
    popUp[0].isOpen = true;
  }

}


document.querySelector('.font-size__button').onclick = function() {
  if (popUp[2].isOpen) {
    closePopUps();
  }
  else {
    closePopUps();
    openPopUp('.font-size');
    popUp[2].isOpen = true;
  }
}

document.querySelector('.page-list__button').onclick = function() {
  if (popUp[3].isOpen) {
    closePopUps();
  }
  else {
    closePopUps();
    openPopUp('.page-list');
    popUp[3].isOpen = true;
  }
}

window.addEventListener('click', function() {  //закрытие менюшек при клике по пустому месту
  if (!checkOpenOrClose()) {
    return
  }
  if ((!event.target.classList.contains('pop-up__item')) &&
      (!event.target.classList.contains('control-button'))) {
    closePopUps();
  }
})

document.querySelector('.color-font').addEventListener('click', function () { //сменить цвет  шрифта
  if (!event.target.classList.contains('color')) {
    return
  }
  changeStyle('.page p', event.target, 'color');
  changeFrame('.color-font', event.target);
})

document.querySelector('.color-back').addEventListener('click', function () { //сменить цвет  фона
  if (!event.target.classList.contains('color')) {
    return
  }
  changeStyle('body', event.target, 'backgroundColor');
  changeFrame('.color-back', event.target);
})

document.querySelector('.font-size').addEventListener('click', function () { //сменить размер шрифта
  if (event.target.tagName == 'LI') {
    let size = event.target.innerHTML;
    changeFontSize(size);
    setUnderline('.font-size', event.target);
  }
})

document.querySelector('.content').addEventListener('click', function () {
  if (event.target.classList.contains('left-button')) { //листать страницу по кнопке слива и справа
    changePage(-1);
  }
  else if (event.target.classList.contains('right-button')) {
    changePage(1);
  }
  else {
    return
  }
} )

window.addEventListener('keydown', function() { //листаь стрелками клавитауры
  if (event.code == 'ArrowLeft') {
    changePage(-1);
  }
  if (event.code == 'ArrowRight') {
    changePage(1);
  }
})

document.querySelector('.page-list').addEventListener('click', function () { //переход на страницу из оглавления
  let stringLength = event.target.innerHTML.length;
  let currentPage = event.target.innerHTML.substring(stringLength, stringLength - 2);
  currentPage.trim();
  goToPage(+currentPage);
})

function changeFrame(className, currentSelect) {  //установить рамку на выбранном цвете
  document.querySelectorAll(className + ' .color').forEach((item) => {
    item.classList.remove('selected-color');
  });
  currentSelect.classList.add('selected-color');
  closePopUps();
}

function changeStyle(className, currentSelect, style) { //поменять цвет
  let color = getComputedStyle(currentSelect).backgroundColor;
  document.querySelectorAll(className).forEach((item) => {
    item.style[style] = color;
  });
}

function changeFontSize(fontSize) { //изменить размер шрифта
  document.querySelectorAll('.page p').forEach((item) => {
    item.style.fontSize = fontSize;
  });
}


function checkOpenOrClose() { //проверить, есть ли открытое меню
  let isSomeOpen = popUp.reduce((acc, item, ) => {
    if (item.isOpen) {
      acc = true;
    }
    return acc;
  }, false);
  return isSomeOpen
}


function openPopUp(popUp) { //открыть меню
  document.querySelector(popUp).classList.remove('hidden');
  document.querySelector(popUp + '__button').classList.add('active-button');
}


function closePopUps() { //закрыть меню
  popUp.forEach((item, i) => {
    document.querySelector(item['class']).classList.add('hidden');
    document.querySelector(item['class'] + '__button').classList.remove('active-button');
    item.isOpen = false;
  });
}

function changePage(direction) { //листать страницу по кнопке
  let lastNumber = pageNumber;
  if ((pageNumber + direction) > 20)  {
    pageNumber = 1;
  } else if ((pageNumber + direction) < 1) {
    pageNumber = 20;
  } else {
    pageNumber = pageNumber + direction;
  }
  document.querySelector('.n' + lastNumber).classList.add('hidden');
  document.querySelector('.n' + pageNumber).classList.remove('hidden');
  setUnderLinePageList();
}

function goToPage(nextNumber) { // перейти на страницу nextNumber
  document.querySelector('.n' + pageNumber).classList.add('hidden');
  document.querySelector('.n' + nextNumber).classList.remove('hidden');
  setUnderline('.page-list', event.target);
  pageNumber = nextNumber;
}

function setUnderline(className, currentSelect) { // установить подчеркивание для выбранного пункта
  document.querySelectorAll(className + ' li').forEach((item) => {
    item.classList.remove('selected-item');
  });
  currentSelect.classList.add('selected-item');
}

function setUnderLinePageList() {  //установить подчеркивание на выбранной странице в оглавлении
  document.querySelectorAll('.page-list li').forEach((item, i) => {
    item.classList.remove('selected-item');
    if (i == pageNumber - 1) {
      item.classList.add('selected-item');
    }
  });
}
