'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var pinMain = document.querySelector('.map__pin--main');
  var mapWithAds = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getLocationPinX = function (adItem) {
    var locationPinX = adItem.location.x - (PIN_WIDTH / 2);
    return locationPinX + 'px';
  };

  var getLocationPinY = function (adItem) {
    var locationPinY = adItem.location.y - PIN_HEIGHT;
    return locationPinY + 'px';
  };

  var fragment = document.createDocumentFragment();

  var onPinMainClick = function () {
    mapWithAds.appendChild(fragment);
    window.map.block.classList.remove('map--faded');
  };

  var renderPins = function (adItem) {
    var clonedPin = similarPinTemplate.cloneNode(true);
    clonedPin.classList.add('map__pin--card');
    clonedPin.style.left = getLocationPinX(adItem);
    clonedPin.style.top = getLocationPinY(adItem);
    clonedPin.querySelector('img').src = adItem.author.avatar;
    clonedPin.querySelector('img').alt = adItem.offer.title;
    return clonedPin;
  };

  var appendPins = function (adItem) {
    var pin = fragment.appendChild(renderPins(adItem));
    pin.addEventListener('click', function () {
      window.offer.showCard(adItem);
    });
  };

  window.get();

  pinMain.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, onPinMainClick);
  });

  pinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinMainClick);
  });

  window.pin = {
    MAIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_HEIGHT: MAIN_PIN_HEIGHT,
    tool: pinMain,
    append: appendPins,

    toolAddress: function () {
      var pinMainX = parseInt(this.tool.style.left, 10) + (MAIN_PIN_WIDTH / 2);
      var pinMainY = parseInt(this.tool.style.top, 10) + MAIN_PIN_HEIGHT;
      return pinMainX + ', ' + pinMainY;
    },

    appendItem: function (adItem) {
      appendPins(adItem);
    }
  };

})();
