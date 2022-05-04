'use strict';

document.addEventListener('DOMContentLoaded', () => {

   // Табы    -------------------------------------------------

   const tabs = document.querySelectorAll('.tab__btn');
   const tabsContent = document.querySelectorAll('.tab-text__item');
   const tabsParent = document.querySelector('.tab__wrapper');

   function hidentabsContent() {
      tabsContent.forEach(item => {
         item.style.display = 'none';
      });

      tabs.forEach(item => {
         item.classList.remove('tab__btn--active');
      });
   }

   function showtabsContent(i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tab__btn--active');
   }

   hidentabsContent();
   showtabsContent();


   tabsParent.addEventListener('click', function (event) {
      const target = event.target;

      if (target && target.classList.contains('tab__btn')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hidentabsContent();
               showtabsContent(i);
            }
         });
      }

      console.log();
   });

   // Табы    -------------------------------------------------


   // Показать ещё  start ==========================================================================
   let btns = document.querySelectorAll('.reviews__more-btn');

   btns.forEach(elem => {
      elem.addEventListener('click', function () {
         this.classList.toggle("active");
         let panel = this.nextElementSibling;
         if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
         } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
         }
      });
   });
   // Показать ещё  end ==============================================================================


   // Показать ещё отзывы  start ==========================================================================

   let btnShowAllReviews = document.querySelector('.tab-reviews__all-btn');
   let panel2 = document.querySelector('.panel2');

   btnShowAllReviews.addEventListener('click', function () {
      if (panel2.style.maxHeight) {
         panel2.style.maxHeight = null;
         btnShowAllReviews.textContent = 'Показать еще отзывы';
      } else {
         panel2.style.maxHeight = panel2.scrollHeight + "px";
         btnShowAllReviews.textContent = 'Свернуть';
      }

   });

   // Показать ещё отзывы end ==============================================================================

});
