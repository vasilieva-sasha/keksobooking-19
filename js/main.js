'use strict';

(function () {

  // var MAP_WIDTH = 1200;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ENTER_KEY = 'Enter';

  var ads = [];
  var adsAmount = 8;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea, button');
  var adFormInputAddress = adForm.querySelector('input[name=address]');
  var adFormSelectRooms = adForm.querySelector('select[name=rooms]');
  var adFormSelectCapacity = adForm.querySelector('select[name=capacity]');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');

  var onWindowLoad = function (collection) {
    window.onLoad = collection.forEach(function (collectionItem) {
      collectionItem.setAttribute('disabled', 'disabled');
    });
  };

  onWindowLoad(adFormInputs);

  var getLocationX = function () {
    return Math.floor(Math.random() * map.offsetWidth);
  };

  var getLocationY = function () {
    return Math.floor(Math.random() * (MAP_HEIGHT_MAX - MAP_HEIGHT_MIN) + MAP_HEIGHT_MIN);
  };

  var getRandomArray = function (array) {
    var randomArray = array.slice(0, Math.floor(Math.random() * array.length));
    return randomArray;
  };

  var createObjectAd = function (i) {
    var roomsAmount = ROOMS[Math.floor(Math.random() * ROOMS.length)];
    var getGuestsAmount = function () {
      var guestsAmount;

      if (roomsAmount === 1) {
        guestsAmount = 1;
      } else if (roomsAmount === 2) {
        guestsAmount = 2;
      } else if (roomsAmount === 3) {
        guestsAmount = 3;
      } else if (roomsAmount === 100) {
        guestsAmount = 'Не для гостей';
      }
      return guestsAmount;
    };

    var x = getLocationX();
    var y = getLocationY();

    var ad = {
      autor: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: x + ',' + y,
        price: 'стоимость',
        type: TYPE[Math.floor(Math.random() * TYPE.length)],
        rooms: roomsAmount,
        guests: getGuestsAmount(),
        checkin: CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
        checkout: CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
        features: getRandomArray(FEATURES),
        description: 'описание',
        photos: getRandomArray(PHOTOS)
      },
      location: {
        x: x,
        y: y,
      }
    };
    return ad;
  };

  var createArrayAds = function () {
    for (var i = 0; i < adsAmount; i++) {
      var adItem = createObjectAd(i);
      ads.push(adItem);
    }
  };
  createArrayAds();

  var getLocationPinX = function (adItem) {
    var locationPinX = adItem.location.x - (PIN_WIDTH / 2);
    return locationPinX + 'px';
  };

  var getLocationPinY = function (adItem) {
    var locationPinY = adItem.location.y - PIN_HEIGHT;
    return locationPinY + 'px';
  };

  var onPinMainClick = function () {
    map.classList.remove('map--faded'); // добавить проверку левой кнопки мыши
    mapWithAds.appendChild(fragment);
    adForm.classList.remove('ad-form--disabled');
    adFormInputs.forEach(function (input) {
      input.removeAttribute('disabled', 'disabled');
    });
  };

  var mapWithAds = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPins = function (adItem) {
    var pin = similarPinTemplate.cloneNode(true);
    pin.style.left = getLocationPinX(adItem);
    pin.style.top = getLocationPinY(adItem);
    pin.querySelector('img').src = adItem.autor.avatar;
    pin.querySelector('img').alt = adItem.offer.title;
    return pin;
  };

  var fragment = document.createDocumentFragment();

  var appendPins = function (adItem) {
    fragment.appendChild(renderPins(adItem));
  };

  ads.forEach(function (adItem) {
    appendPins(adItem);
  });

  var getMainPinAddress = function () {
    var pinMainX = parseInt(pinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
    var pinMainY = parseInt(pinMain.style.top, 10) + MAIN_PIN_HEIGHT;
    return pinMainX + ', ' + pinMainY;
  };

  adFormInputAddress.value = getMainPinAddress();

  pinMain.addEventListener('mousedown', function () {
    onPinMainClick();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      onPinMainClick();
    }
  });

  var checkValidity = function () {
    if (adFormSelectRooms.value < adFormSelectCapacity.value) {
      adFormSelectCapacity.setCustomValidity('слишком много гостей!');
    }
  };

  // checkValidity();

  adFormSelectCapacity.addEventListener('change', function () {

    checkValidity();

  });

})();
