'use strict';

(function () {
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var mapBlock = document.querySelector('.map');

  window.map = {
    HEIGHT_MIN: MAP_HEIGHT_MIN,
    HEIGHT_MAX: MAP_HEIGHT_MAX,
    block: mapBlock
  };

})();
