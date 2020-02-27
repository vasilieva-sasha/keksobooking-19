'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isLeftMouseEvent: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
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
