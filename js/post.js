'use strict';

(function () {
  var POST = 'POST';
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var main = document.querySelector('main');

  window.post = {
    upload: function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.timeout = TIMEOUT;

      xhr.open(POST, URL);
      xhr.send(data);
    },

    respond: function (template, action) {
      var message = template.cloneNode(true);
      main.appendChild(message);

      document.addEventListener('keydown', function (evt) {
        window.util.isEscapeEvent(evt, function () {
          message.remove();
        });
      });

      document.addEventListener('click', function () {
        message.remove();
      });

      action();
    },

    close: function (message) {
      var button = message.querySelector('button');
      button.addEventListener('click', function () {
        message.remove();
      });
    }
  };
})();
