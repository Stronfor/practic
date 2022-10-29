/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  /*  =========   CALCULIATOR */
  /* FORMULA : MEN = (88.36 + (13,4 * weight, kg) + (4,8 * height, cm) - (5,7 * age, eyrs)) * coof dayActive 
  /* FORMULA : WOMEN = (447.6 + (9,2 * weight, kg) + (3,1 * height, cm) - (4,3 * age, eyrs)) * coof dayActive 

    коэфициэнт Активности статичный мы добавили в верстку как атрибуты: data-ratio="1.2" - низкий уровень, data-ratio="1.375" - невысокий ... 
  */

  const result = document.querySelector(".calculating__result span"); // сюда выводим результат

  let sex, height, weight, age, ratio;

  // проверяем или есть данные в localStorage
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female"; // что то типа по умолчанию если в хранилище нет
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375; // что то типа по умолчанию если в хранилище нет
    localStorage.setItem("ratio", 1.375);
  }

  // = функция для опредиления класса активности с учетом localStorage
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((item) => {
      item.classList.remove(activeClass);
      if (item.getAttribute("id") === localStorage.getItem("sex")) {
        item.classList.add(activeClass);
      }
      if (item.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        item.classList.add(activeClass);
      }
    });
  }
  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  // = функция подсчета
  function calcTotal() {
    // проверка на пополненость всех полей
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "-__- ";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }
  calcTotal();

  // = получение данных со статичных блоков
  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    // получаем все дивы
    elements.forEach((item) => {
      item.addEventListener("click", (e) => {
        // если блок имеент атрибут ratio(data-ratio="1.2) то берем его, если нет то берем ID
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          //сохраняем выбор пользователя в localStorage
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        // add classActive
        elements.forEach((item) => {
          item.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }
  // для блока пола
  getStaticInformation("#gender", "calculating__choose-item_active");
  // для блока активности
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  // = получение данных с input . Одна функц для всех
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    // ПРОВЕРКА если в строке есть НЕ ЧИСЛА
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      //проверка что именно ввел пользователь (вес, рост или возраст)
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  // +CARTS with class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; // на случай если зохотим потом добавлять какоето клыссы(вернет массив классов или вернет пустой массив)
      this.transfer = 27;
      this.changeToUAH(); //сразу вызвали метод который вернет переобраз цену с доллара на грн
      this.parent = document.querySelector(parentSelector);
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      // заггрузка карточки на страницу
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = "menu__item"; // устанавливаем класс по умолчанию
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день
            </div>`;

      this.parent.append(element);
    }
  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((data) => {
    // строим наши карточки на основе данных с сервера
    //data.forEach((obj) => {
    //new MenuCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render();

    data.forEach(({ img, altimg, title, descr, price }) => {
      // пришедшие данные деструктурируем (чтобы не писать каджый раз obj.img, obj.altimg...)
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // работа с  сервером через AXIOS

  // axios.get("http://localhost:3000/menu").then((item) => {
  //   item.data.forEach(({ img, altimg, title, descr, price }) => {
  //     // пришедшие данные деструктурируем (чтобы не писать каджый раз obj.img, obj.altimg...)
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // ВТОРОЙ ВАРИАНТ СОЗДАНИЯ КАРТОЧЕК БЕЗ ИСПОЛЬЗОВАНИЯ КЛАССОВ (создает верстку на лету)

  /*  getResource("http://localhost:3000/menu").then((data) => {
                      createCard(data);
                    });

                    function createCard(data) {
                      // то что пришло с сервера
                      data.forEach(({ img, altimg, title, descr, price }) => {
                        const element = document.createElement("div");

                        element.classList.add("menu__item");

                        element.innerHTML = `
                                <img src=${img} alt=${altimg} />
                                <h3 class="menu__item-subtitle">Меню ${title}</h3>
                                <div class="menu__item-descr"> ${descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price"><div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${price}</span> грн/день</div>
                                `;
                        document.querySelector(".menu .container").append(element);
                      });
                    } */

  /* ЭТО было до того как мы получили данные с сервера. Все прописывали руками

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Фитнес",
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
    "menu__item"
  ).render(); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  ////// =======>  ОТправка ДАнныйх формы на сервер

  /* так как у нас 2 формы, что бы не повторять код напишем функцию которую будим вызывать для отправки каждой формы!!! */
  // для этой задачи будем использ устаревший метод XMLHttpRequest()

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    //приминение функции отплавки формы к каждой форме
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      // общение с пользователем
      // отменям стандартное поведение браузера
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      statusMessage.textContent = message.loading;
      // вставляем на страницу
      form.insertAdjacentElement("afterend", statusMessage);

      // отправка на сервер (FormData)
      const formData = new FormData(form);

      //   fetch("server.php", {
      //     // отправка на сервер
      //     method: "POST",
      //     //headers: {"Content-tpe": "application/json"},// только в случае отправки формата JSON
      //     body: formData, //зависит от формата сервера formData or JSON
      //   })
      //     .then((data) => data.text()) // переобразовали результат в текстовый формат
      //     .then((data) => {
      //       //обработка результата запроса
      //       console.log(data); // data это то что вернул сервер
      //       showThanksModal(message.success);
      //       statusMessage.remove();
      //     })
      //     .catch(() => {
      //       showThanksModal(message.failure); // в случае какой либо ошибки
      //     })
      //     .finally(() => {
      //       form.reset();
      //     });
      // });

      // отправка на сервер (JSON)

      // преобр. FormData => JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // fetch("server.php", {
      //   // отправка на сервер
      //   method: "POST",
      //   headers: { "Content-tpe": "application/json" }, // только в случае отправки формата JSON
      //   body: json, //зависит от формата сервера formData or JSON
      // });

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json) //http://localhost:3000/requests => адрес БД через наш вертуальный сервер
        //.then((data) => data.text()) // переобразовали результат в текстовый формат
        .then((data) => {
          //обработка результата запроса
          console.log(data); // data это то что вернул сервер
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure); // в случае какой либо ошибки
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  // МОДАЛЬНОЕ ОКНО ПРИ ОТПРАВКЕ ФОРМЫ

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
    // change modal (один модуль заменяем другим)
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;
    //загружаем созданую модалку на страницу
    document.querySelector(".modal").append(thanksModal);

    //на случай если клиент еще раз откроет модалку=нужно вернуть старый вид окна
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  //блокируем прокрутку страницы при запyщеной модалке
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId); //если пользователь открыл модалку сам тогда модалка с таймера удалится
  }
}

function closeModal(modalSelector) {
  // hide modal
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = ""; // scroll default
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  ////// =======> Модальное ОКНО при нажатии связатся с нами. по умолч скрыто

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((item) => {
    //показываем модалку
    item.addEventListener("click", () => {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll); //delete listener который при скроле если модалка была уже включена
    });
  });

  // закритие моделки при клике на пустое место
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  // close from kaybord ESC
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      // when modal window is open
      //евент таргет отслеживает клаыишу на которую нажали (ее код Escape)
      closeModal(modalSelector);
    }
  });

  // OPEN MODAL WHEN SCROLL DOWN & OVER TIME

  // SCROLL
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      //значит долистал до конца страници
      //window.pageYOffset => прокрученая не видимая верхняя часть окна
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll); //delete listener
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  //// SLIDER

  const prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field), // блок в которое поместим все слайды в ширину
    width = window.getComputedStyle(slidesWrapper).width; // получили ширину окошка просмотра слайда

  let slideIndex = 1;

  // ================ SLIDER 2  типа КАРУСЕЛЬ
  let offset = 0; //ориентир отступа ширини для показа нужного слайда (смищение блока с слайдами)

  // нумерация
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }
  if (slideIndex < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%"; //увеличили ширину чтоб поместились все слайды в ширину
  slidesField.style.display = "flex"; // расположили слайды в одну линию
  slidesField.style.transition = "0.5s all"; // чтобы плавно передвигалось

  slidesWrapper.style.overflow = "hidden"; //скрываем все что выходит за окошко

  slides.forEach((item) => {
    item.style.width = width; //точно знаем что все слайды равны нашему окошку
  });

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    //сейчас в width лежит строка ('400px') нужно перевести в число + отрезать 'px'
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      //заменил буквы на 'ничего'
      offset = 0; //долистал до конца переmотка в начало
    } else {
      offset += deleteNotDigits(width); // если норм то ориентир увеличиваенся на ширину еще 1 слайда
    }

    slidesField.style.transform = `translateX(-${offset}px)`; //сдвигание блока в лево (минусоввое значение = лево)

    //numbers
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    // dots active
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    //сейчас в prev лежит строка ('400px') нужно перевести в число + отрезать 'px'
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1); //долистал до начала перезод в конуц
    } else {
      offset -= deleteNotDigits(width); // если норм то ориентир уменьшается на ширину еще 1 слайда
    }

    slidesField.style.transform = `translateX(-${offset}px)`; //сдвигание блока в лево (минусоввое значение = лево)

    //numbers
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    // dots active
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  // navigations dot of slider

  slider.style.position = "relative";
  // блок для точек
  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
  slider.append(indicators);

  // точки (сколько слайдов столько и точек)
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1); // устанавлеваем каждой точке свой атрибут(идентификатор)
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
  `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  // click for dots

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      dots.forEach((dot) => (dot.style.opacity = ".5")); // activ dot
      dots[slideIndex - 1].style.opacity = 1;

      if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
    });
  });

  // ======== slider 1 ОБЫЧНЫЙ СЛАЙДЕР

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIndex - 1].style.display = "block";

  //   if (slideIndex < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });
  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  /////////////  TABS //////////////////

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  // Hid TAB Content

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  //
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  // события табсов через делегирование
  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  //////////////////////  TIMER  ////////////////////////

  // определяем разницу между теккущим временнем и дедЛайном
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()); // разница в милисикундах

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else return num;
  }

  // устанавлеваем часы на страницу
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock(); //вызвали здесь чтоб цбрать баг со старыми значениями таймера

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // остановка таймера при стичении времени
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
// ВЕСЬ футкционал по общению с СЕРВЕРОМ выносим в отдельнцю функцию

const postData = async (url, data) => {
  //async говорит что это асинхр код. await = места где нужно дождаться результата
  const res = await fetch(url, {
    // Это АСИНХРОННЫЙ код. пока будет формироватся запрос  return res.json(); зохочет вернуть ответ которого ЕЩЕ не будет!!!!
    method: "POST",
    headers: { "Content-tpe": "application/json" }, // только в случае отправки формата JSON
    body: data,
  });

  return await res.json(); // ПРОМИС (перед выдачей результата нцжно дождаться его выполнения)
};

async function getResource(url) {
  let res = await fetch(url);

  /* так как в промиссах с использованием .cath не считается ошибкой отсутствие соединения с сервером....
    мы проверяем это условиями с использованием НОВЫХ свойств ПРОМИСА

    = .ok =====> значит все прошло как нужно
    = .status ======>  какой статус действия
  */

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`); //  throw => вывод в консоль.. new Error = созданый вручную обьект ошибки (сообщение ошибки )
  }

  return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {
  // time
  const modalTimerId = setTimeout(
    () => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerId),
    50000
  );

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2023-01-01");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slide-inner",
  });
}); //npx json-server db.json

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map