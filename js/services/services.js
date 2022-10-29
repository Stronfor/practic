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

export { postData };
export { getResource };
