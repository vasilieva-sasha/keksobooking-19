'use strict';

(function () {

  var MAP_WIDTH = 1200;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 70;
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ad = {};
  var ADS = [];

  var adsAmount = 8;

  var renderAvatarUrl = function () {
    for (var i = 0; i < adsAmount; i++) {
      var avatarUrl = 'img/avatars/user0' + (i + 1) + '.png';
    }
    return avatarUrl;
  };

  var getLocationX = function () {
    return Math.floor(Math.random() * MAP_WIDTH);
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

    ad = {
      autor: {
        avatar: renderAvatarUrl(i)
      },
      offer: {
        title: 'Заголовок предложения',
        address: location.x + ',' + location.y,
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
        x: getLocationX(),
        y: getLocationY(),
      }
    };
    return ad;
  };

  var createArrayAds = function () {
    for (var i = 0; i < adsAmount; i++) {
      createObjectAd(i);
      ADS.push(ad);
    }
  };
  createArrayAds();

  var getLocationPinX = function () {
    var locationPinX = getLocationX() + (PIN_WIDTH / 2);
    return locationPinX + 'px';
  };

  var getLocationPinY = function () {
    var locationPinY = getLocationY() + PIN_HEIGHT;
    return locationPinY + 'px';
  };

  document.querySelector('.map').classList.remove('map--faded');

  var mapWithAds = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPins = function () {
    var pin = similarPinTemplate.cloneNode(true);
    pin.style.left = getLocationPinX();
    pin.style.top = getLocationPinY();
    pin.querySelector('img').src = ad.autor.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    return pin;
  };
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS.length; i++) {
    fragment.appendChild(renderPins());
  }

  mapWithAds.appendChild(fragment);

})();
