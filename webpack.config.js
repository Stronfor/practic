"use strict";

let path = require("path");

module.exports = {
  mode: "development", // режим (development/production)
  entry: "./js/script.js", // тот фойл с которого начинаем
  output: {
    // выход. тот файл который получим в итоге
    filename: "bundle.js", // его название
    path: __dirname + "/js", // куда положим
  },
  watch: true, // отслеживает изменения и автоматом изменяет

  devtool: "source-map", // как сохранять исходники. так как после оптимизации код не читаем
  module: {}, // модули и их настройка
};
