'use strict';

(function () {
  var GET = 'GET';
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = 10000;
  window.dataLoaded = false;

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.get = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
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
    xhr.timeout = TIMEOUT;

    xhr.open(GET, URL);
    xhr.send();

  };
})();
