'use strict';

document.addEventListener('DOMContentLoaded', () => {



   // ======================================================================================
   // const favoriteColor = document.querySelector('.popular-item__favorite');
   // favoriteColor.addEventListener('click', function () {
   //    favoriteColor.classList.toggle('popular-item__favorite--active');
   // });

   let favoriteColor = document.querySelectorAll('.popular-item__favorite');
   favoriteColor.forEach((elem, index) => {
      elem.addEventListener('click', function () {
         elem.classList.toggle('popular-item__favorite--active');

      });
      // console.log(elem);
   });
   // console.log(favoriteColor);
   // ======================================================================================
   // Slider new-products start =====================================================================================
   const newProducts = new Swiper('.new-slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 6,
      spaceBetween: 30,
      slidesPerGroup: 1,
      speed: 800,

      // Responsive breakpoints
      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1,
            spaceBetween: 10
         },
         // when window width is >= 480px
         480: {
            slidesPerView: 2,
            spaceBetween: 30
         },
         // when window width is >= 640px
         640: {
            slidesPerView: 3,
            spaceBetween: 30
         },
         800: {
            slidesPerView: 4,
            spaceBetween: 30
         },
         1000: {
            slidesPerView: 5,
            spaceBetween: 30
         },
         1200: {
            slidesPerView: 6,
            spaceBetween: 30
         }
      },

      // Navigation arrows
      navigation: {
         nextEl: '.new-products__button-next',
         prevEl: '.new-products__button-prev',
      },
   });
   // Slider new-products end =======================================================================================



   // Slider popular__slider start =====================================================================================
   const popular = new Swiper('.popular__slider', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 6,
      spaceBetween: 30,
      slidesPerGroup: 1,
      speed: 800,

      // Responsive breakpoints
      breakpoints: {
         // when window width is >= 320px
         320: {
            slidesPerView: 1,
            spaceBetween: 10
         },
         // when window width is >= 480px
         480: {
            slidesPerView: 2,
            spaceBetween: 30
         },
         // when window width is >= 640px
         640: {
            slidesPerView: 3,
            spaceBetween: 30
         },
         800: {
            slidesPerView: 4,
            spaceBetween: 30
         },
         1000: {
            slidesPerView: 5,
            spaceBetween: 30
         },
         1200: {
            slidesPerView: 6,
            spaceBetween: 30
         }
      },

      // Navigation arrows
      navigation: {
         nextEl: '.products__button-next',
         prevEl: '.products__button-prev',
      },
   });
   // Slider popular__slider end =======================================================================================

   // Slider banner-slider start =====================================================================================
   const banner = new Swiper('.banner-slider', {
      // Optional parameters
      // direction: 'vertical',
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
         el: '.swiper-pagination , .swiper-pagination-one',
         clickable: true,
      },

      // Navigation arrows
      navigation: {
         nextEl: '.swiper-button-next , .banner-button-next',
         prevEl: '.swiper-button-prev , .banner-button-prev',
      },

      // And if we need scrollbar
      // scrollbar: {
      // el: '.swiper-scrollbar',
      // },
   });
   // Slider banner-slider end =======================================================================================
   // Меню бургер ======================================================================================
   //Burger start   ====================================================================================
   const iconMenu = document.querySelector(".icon-menu");
   const menuBody = document.querySelector(".menu__list");

   if (iconMenu) {
      iconMenu.addEventListener("click", function (e) {
         document.body.classList.toggle("_lock");
         iconMenu.classList.toggle("menu-open");
         // menuBody.classList.toggle("menu-open");
         menuBody.classList.toggle('menu__list--active');
      });
   }
   //Burger  end  ==========================================================================================

   //DYNAMIC ADAPT  start ===================================================================================
   // Dynamic Adapt v.1
   // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
   // e.x. data-da=".item,992,2"
   // Andrikanych Yevhen 2020
   // https://www.youtube.com/c/freelancerlifestyle

   // "use strict";

   function DynamicAdapt(type) {
      this.type = type;
   }

   DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = "_dynamic_adapt_";
      // массив DOM-элементов
      this.nodes = document.querySelectorAll("[data-da]");

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
         const node = this.nodes[i];
         const data = node.dataset.da.trim();
         const dataArray = data.split(",");
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(dataArray[0].trim());
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
         оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
         return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
      }, this);
      this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
         return Array.prototype.indexOf.call(self, item) === index;
      });

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
         const media = this.mediaQueries[i];
         const mediaSplit = String.prototype.split.call(media, ',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];

         // массив объектов с подходящим брейкпоинтом
         const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
         });
         matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
         });
         this.mediaHandler(matchMedia, оbjectsFilter);
      }
   };

   DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
         for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
         }
      } else {
         for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
               this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
         }
      }
   };

   // Функция перемещения
   DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
         destination.insertAdjacentElement('beforeend', element);
         return;
      }
      if (place === 'first') {
         destination.insertAdjacentElement('afterbegin', element);
         return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
   }

   // Функция возврата
   DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
         parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
         parent.insertAdjacentElement('beforeend', element);
      }
   }

   // Функция получения индекса внутри родителя
   DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
   };

   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === "min") {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return -1;
               }

               if (a.place === "last" || b.place === "first") {
                  return 1;
               }

               return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
         });
      } else {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return 1;
               }

               if (a.place === "last" || b.place === "first") {
                  return -1;
               }

               return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
         });
         return;
      }
   };

   const da = new DynamicAdapt("max");
   da.init();


   // DYNAMIC ADAPT  end =====================================================================================

});

//=====  JQuery  start  =============================================================

$(document).ready(function () {
   $("form").submit(function () { // Событие отправки с формы
      var form_data = $(this).serialize(); // Собираем данные из полей
      $.ajax({
         type: "POST", // Метод отправки
         url: "send.php", // Путь к PHP обработчику sendform.php
         data: form_data,
         success: function () {
            $('.overley').addClass('overley-visible');
            $('.modal').addClass('modal__visible');
         }
      }).done(function () {
         $(this).find('input').val('');
         $('form').trigger('reset');
      });
      event.preventDefault();
   });
});


// Slick slider start ====================================================================
$(function () {
   $('.your-class').slick({
      dots: true,
   });

});

// Slick slider finish ====================================================================

//=====  JQuery  finish ===================================================================
