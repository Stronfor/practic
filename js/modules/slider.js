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

export default slider;
