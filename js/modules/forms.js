import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

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

      postData("http://localhost:3000/requests", json) //http://localhost:3000/requests => адрес БД через наш вертуальный сервер
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
    openModal(".modal", modalTimerId);
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
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
