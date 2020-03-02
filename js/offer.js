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
    } else if (adItem.offer.guests === 0) {
      return ' не для гостей';
    } else {
      return ' для ' + adItem.offer.guests + ' гостей';
    }
  };

  var completeCard = function (adItem) {
    var card = cardTemplate.cloneNode(true);
    card.classList.add('popup--ad');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhoto = card.querySelector('.popup__photo');
    var cardFeaturesCollection = card.querySelectorAll('.popup__feature');
    var cardFeatures = card.querySelector('.popup__features');
    var buttonClose = card.querySelector('.popup__close');

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

    card.querySelector('.popup__avatar').src = adItem.author.avatar;

    buttonClose.addEventListener('click', function () {
      removeCard();
    });
    document.addEventListener('keydown', function (evt) {
      window.util.isEscapeEvent(evt, removeCard);
    });

    var removeCard = function () {
      card.remove();
      document.removeEventListener('keydown', function (evt) {
        window.util.isEscapeEvent(evt, removeCard);
      });
    };

    return card;
  };

  var showCard = function (adItem) {
    var oldCard = document.querySelector('.popup--ad');
    if (oldCard) {
      oldCard.remove();
    }
    window.map.block.insertBefore(completeCard(adItem), mapFilters);
  };

  window.offer = {
    showCard: showCard
  };

})();
