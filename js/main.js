'use strict';

(function () {

  // var MAP_WIDTH = 1200;
  // var MAP_HEIGHT_MIN = 130;
  // var MAP_HEIGHT_MAX = 630;
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var AUTOR = {};
  // var OFFER = {};
  // var LOCATION = {};
  var ad = {};
  var ADS = [];

  var adsAmount = 8;

  var renderAvatarUrl = function () {
    for (var i = 1; i <= adsAmount; i++) {
      var avatarUrl = 'img/avatars/user0' + i + '.png';
    }
    return avatarUrl;
  };

  var createObjectAd = function () {
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
        avatar: renderAvatarUrl() // 'img/avatars/user0' +  + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: 'x, y', // сделать функцию?
        price: 'стоимость',
        type: TYPE[Math.floor(Math.random() * TYPE.length)],
        rooms: roomsAmount,
        guests: getGuestsAmount(),
        checkin: CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
        checkout: CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
        features: FEATURES, // написать функцию которая рандомно возрвщает несколько элементов массива
        description: 'описание',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: 'function()',
        y: 'function()',
      }
    };
    return ad;
  };

  var createArrayAds = function () {
    for (var i = 0; i < adsAmount; i++) {
      createObjectAd();
      ADS.push(ad);
    }
  };
  createArrayAds();
  console.log(ADS);

  // var avatar = renderAvatarUrl();
  // var title = 'Заголовок предложения';
  // var address = 'x, y'; // сделать функцию?
  // var price = 'стоимость';
  // var guests = 'number';
  // var description = 'описание';
  // var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var x = 'function()';
  // var y = 'function()';

  // var createObjectAutor = function () {
  //   AUTOR.avatar = avatar;
  // };

  // var createObjectOffer = function () {
  //   OFFER.title = title;
  //   OFFER.address = address;
  //   OFFER.price = price;
  //   OFFER.TYPE = TYPE;
  //   OFFER.ROOMS = ROOMS;
  //   OFFER.guests = guests;
  //   OFFER.CHECKIN = CHECKIN;
  //   OFFER.CHECKOUT = CHECKOUT;
  //   OFFER.FEATURES = FEATURES;
  //   OFFER.description = description;
  //   OFFER.photos = photos;
  // };

  // var createObjectLocation = function () {
  //   LOCATION.x = x;
  //   LOCATION.y = y;
  // };

  // var createObjectAd = function () {
  //   AD.AUTOR = AUTOR;
  //   AD.OFFER = OFFER;
  //   AD.LOCATION = LOCATION;
  // };

  // var createArrayAds = function () {
  //   createObjectAutor();
  //   createObjectOffer();
  //   createObjectLocation();
  //   for (var i = 0; i < adsAmount; i++) {
  //     createObjectAd();
  //     ADS.push(AD);
  //   }
  // };

  // createArrayAds();
  // console.log(AUTOR, OFFER, LOCATION, AD, ADS);

  // var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // var similarAdTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var mapWithAds = document.querySelector('.map__pins');

  // var renderAds = function (arr) {
  //   var ad = similarAdTemplate.cloneNode(true);
  //   var pin = similarPinTemplate.cloneNode(true);
  //   // pin.querySelector('img').src = arr.avatar;
  //   // ad.querySelector('.popup__title').textContent = arr.title;
  //   return pin;
  // };

  // document.querySelector('.map').classList.remove('map--faded');
  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < ADS.length; i++) {
  //   fragment.appendChild(renderAds());
  // }

  // mapWithAds.appendChild(fragment);
})();
