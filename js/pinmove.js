'use strict';

(function () {

  var adFormInputAddress = document.querySelector('input[name=address]');

  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, function () {
      dragPin(evt);
    });
  });

  var dragPin = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var checkOffset = function (current, min, max, pinSize) {
        if (current < (min - (pinSize / 2))) {
          return min - (pinSize / 2);
        } else if (current > max) {
          return max;
        }

        return current;
      };

      var left = checkOffset(window.pin.tool.offsetLeft, window.map.WIDTH_MIN, (window.map.block.offsetWidth - (window.pin.MAIN_WIDTH / 2)), window.pin.MAIN_WIDTH) - shift.x;
      var top = checkOffset(window.pin.tool.offsetTop, window.map.HEIGHT_MIN, window.map.HEIGHT_MAX, window.pin.MAIN_HEIGHT) - shift.y;
      window.pin.tool.style.top = top + 'px';
      window.pin.tool.style.left = left + 'px';
      adFormInputAddress.value = window.pin.mainPinAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

})();
