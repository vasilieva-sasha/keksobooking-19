'use strict';

(function () {

  var Pin = {
    WIDTH: 40,
    HEIGHT: 70
  };

  var MainPin = {
    WIDTH: 62,
    HEIGHT: 84,
    TOP: 375,
    LEFT: 570
  };

  var RESULT_AMOUNT = 5;

  window.offers = [];

  var pinMain = document.querySelector('.map__pin--main');
  var mapWithAds = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var onSuccess = function (data) {
    window.offers = data;
    window.dataLoaded = true;
  };

  window.get(onSuccess);

  var getLocationPinX = function (adItem) {
    var locationPinX = adItem.location.x - (Pin.WIDTH / 2);
    return locationPinX + 'px';
  };

  var getLocationPinY = function (adItem) {
    var locationPinY = adItem.location.y - Pin.HEIGHT;
    return locationPinY + 'px';
  };

  var fragment = document.createDocumentFragment();

  var onPinMainClick = function () {
    window.showPins(window.offers);
    window.filters.block.reset();
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
    if ('offer' in adItem) {
      var pin = fragment.appendChild(renderPins(adItem));
      pin.addEventListener('click', function () {
        window.offer.showCard(adItem);
        var pins = document.querySelectorAll('.map__pin--card');
        pins.forEach(function (item) {
          item.classList.remove('map__pin--active');
        });
        pin.classList.add('map__pin--active');
      });
      mapWithAds.appendChild(fragment);
    }
  };

  window.showPins = function (data) {
    var takeNumber = data.length > RESULT_AMOUNT ? RESULT_AMOUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.pin.appendItem(data[i]);
    }
  };

  pinMain.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, onPinMainClick);
  });

  pinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinMainClick);
  });

  window.pin = {
    Main: MainPin,
    tool: pinMain,
    append: appendPins,

    toolAddress: function () {
      var pinMainX = parseInt(this.tool.style.left, 10) + (this.Main.WIDTH / 2);
      var pinMainY = parseInt(this.tool.style.top, 10) + this.Main.HEIGHT;
      return pinMainX + ', ' + pinMainY;
    },

    toolAddressInactive: function () {
      var pinMainXInactive = this.Main.LEFT + (this.Main.WIDTH / 2);
      var pinMainYInactive = this.Main.TOP + (this.Main.HEIGHT / 2);
      return pinMainXInactive + ', ' + pinMainYInactive;
    },
    appendItem: function (adItem) {
      appendPins(adItem);
    },
    get: function () {
      window.get(onSuccess);
    }
  };

})();
