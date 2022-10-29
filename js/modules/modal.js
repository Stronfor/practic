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

export default modal;
export { closeModal };
export { openModal };
