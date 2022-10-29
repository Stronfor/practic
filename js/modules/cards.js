import { getResource } from "../services/services";

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

  getResource("http://localhost:3000/menu").then((data) => {
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

export default cards;
