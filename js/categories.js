'use strict';

document.addEventListener('DOMContentLoaded', () => {

   // Скрыть / показать "ВСЕ КАТЕГОРИИ" ====================================================
   const categoriesItemsAllBtn = document.querySelector('.categories__box-all');
   const categoriesBoxHiddens = document.querySelectorAll('.categories__box-hidden');
   const categoriesItemText = document.querySelector('.categories__item-text--white');

   categoriesItemsAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      categoriesBoxHiddens.forEach(elem => {

         if (elem.classList.contains('categories__box-hidden--active')) {
            elem.classList.toggle('categories__box-hidden--active');
            categoriesItemText.innerText = 'Все категории ';
         }
         else if (elem.classList.contains('categories__box-hidden')) {
            elem.classList.toggle('categories__box-hidden--active');
            categoriesItemText.innerText = 'Свернуть';

         }
      });
   });

});