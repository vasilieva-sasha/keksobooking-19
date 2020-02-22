'use strict';

(function () {
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var ads = [];
  var adsAmount = 8;

  var getLocationX = function () {
    return Math.floor(Math.random() * window.map.block.offsetWidth);
  };

  var getLocationY = function () {
    return Math.floor(Math.random() * (window.map.HEIGHT_MAX - window.map.HEIGHT_MIN) + window.map.HEIGHT_MIN);
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
        guestsAmount = ' не для гостей';
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

  window.data = {
    ads: ads
  };

})();
