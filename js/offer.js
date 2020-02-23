'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var mapFilters = document.querySelector('.map__filters-container');

  var offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var getCorrectWordRooms = function (adItem) {
    if (adItem.offer.rooms === 1) {
      return adItem.offer.rooms + ' комната';
    } else if (adItem.offer.rooms === 2 || adItem.offer.rooms === 3) {
      return adItem.offer.rooms + ' комнаты';
    } else {
      return adItem.offer.rooms + ' комнат';
    }
  };

  var getCorrectWordGuests = function (adItem) {
    if (adItem.offer.guests === 1) {
      return ' для ' + adItem.offer.guests + ' гостя';
    } else if (adItem.offer.guests === 2 || adItem.offer.guests === 3) {
      return ' для ' + adItem.offer.guests + ' гостей';
    } else {
      return adItem.offer.guests;
    }
  };

  var completeCard = function (adItem) {
    var card = cardTemplate.cloneNode(true);
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhoto = card.querySelector('.popup__photo');
    var cardFeaturesCollection = card.querySelectorAll('.popup__feature');
    var cardFeatures = card.querySelector('.popup__features');

    card.querySelector('.popup__title').textContent = adItem.offer.title;
    card.querySelector('.popup__text--address').textContent = adItem.offer.address;
    card.querySelector('.popup__text--price').textContent = adItem.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = offerType[adItem.offer.type];
    card.querySelector('.popup__text--capacity').textContent = getCorrectWordRooms(adItem) + getCorrectWordGuests(adItem);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adItem.offer.checkin + ', выезд до ' + adItem.offer.checkout;

    if (cardFeaturesCollection.length > adItem.offer.features.length) {
      for (var j = cardFeaturesCollection.length - 1; j >= adItem.offer.features.length; j--) {
        cardFeatures.removeChild(cardFeaturesCollection[j]);
      }
    }

    card.querySelector('.popup__description').textContent = adItem.offer.description;
    cardPhoto.src = adItem.offer.photos[0];

    if (adItem.offer.photos.length === 0) {
      cardPhotos.removeChild(cardPhoto);
    } else if (adItem.offer.photos.length > 1) {
      for (var i = 1; i < adItem.offer.photos.length; i++) {
        var clonedPhoto = cardPhoto.cloneNode(true);
        cardPhotos.appendChild(clonedPhoto);
        clonedPhoto.src = adItem.offer.photos[i];
      }
    }

    card.querySelector('.popup__avatar').src = adItem.autor.avatar;

    return card;
  };

  var showCard = function (adItem) {
    window.map.block.insertBefore(completeCard(adItem), mapFilters);
  };

  // window.pin.tool.addEventListener('mousedown', function (evt) {
  //   window.util.isLeftMouseEvent(evt, showCard());
  // });

  // window.pin.tool.addEventListener('keydown', function (evt) {
  //   window.util.isEnterEvent(evt, showCard());
  // });

  // 4-3
  var renderCard = function () {
    var pins = document.querySelectorAll('.map__pin--card');
    for (var l = 0; l < pins.length; l++) {
      pins[l].addEventListener('click', function () {
        showCard(window.data.ads[l]);
      });
    }
    console.log(pins);
  };


  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, renderCard());
  });

})();
