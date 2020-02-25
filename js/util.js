'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  window.util = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isLeftMouseEvent: function (evt, action) {
      if (evt.wich === 1) {
        action();
      }
    },
    isEscapeEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    }
  };

})();
