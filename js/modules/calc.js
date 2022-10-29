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

export default calc;
