'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.get = function (onSuccess, onError) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ближайшие объявления не загрузились: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Слишком долгий ответ сервера');
    });
    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();

  };
})();
