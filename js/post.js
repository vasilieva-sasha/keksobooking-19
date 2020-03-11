'use strict';

(function () {
  var POST = 'POST';
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };
  var main = document.querySelector('main');
  var removeMessage = function (message) {
    message.remove();
    document.removeEventListener('keydown', window.util.isEscapeEvent);
    document.removeEventListener('keydown', window.util.isEscapeEvent);
    document.removeEventListener('click', removeMessage);
  };

  window.post = {
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });
      xhr.addEventListener('timeout', function () {
        onError();
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
          removeMessage(message);
        });
      });

      document.addEventListener('click', function () {
        removeMessage(message);
      });

      action();
    },

    close: function (message) {
      var button = message.querySelector('button');
      button.addEventListener('click', function () {
        removeMessage(message);
      });

      button.addEventListener('keydown', function (evt) {
        window.util.isEscapeEvent(evt, function () {
          removeMessage(message);
        });
      });
    }
  };
})();
