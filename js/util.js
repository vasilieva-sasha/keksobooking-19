'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  window.util = {
    ENTER_KEY: ENTER_KEY,
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    isLeftMouseEvent: function (evt, action) {
      if (evt.wich === 1) {
        action();
      }
    }
  };

})();
