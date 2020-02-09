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
    window.map.block.classList.remove('map--faded');
    mapWithAds.appendChild(fragment);
  };

  var renderPins = function (adItem) {
    var pin = similarPinTemplate.cloneNode(true);
    pin.style.left = getLocationPinX(adItem);
    pin.style.top = getLocationPinY(adItem);
    pin.querySelector('img').src = adItem.autor.avatar;
    pin.querySelector('img').alt = adItem.offer.title;
    return pin;
  };

  var appendPins = function (adItem) {
    fragment.appendChild(renderPins(adItem));
  };

  window.data.ads.forEach(function (adItem) {
    appendPins(adItem);
  });

  pinMain.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, onPinMainClick());
  });

  pinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinMainClick());
  });

  var mainPinAddress;
  var getMainPinAddress = function () {
    var pinMainX = parseInt(pinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
    var pinMainY = parseInt(pinMain.style.top, 10) + MAIN_PIN_HEIGHT;
    mainPinAddress = pinMainX + ', ' + pinMainY;
  };

  getMainPinAddress();

  window.pin = {
    mainPinAddress: mainPinAddress,
    tool: pinMain
  };

})();
