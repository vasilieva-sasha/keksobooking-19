'use strict';

(function () {

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterBlock = document.querySelector('.map__filters');
  var filters = filterBlock.querySelectorAll('input, select');
  var type = filterBlock.querySelector('#housing-type');
  var price = filterBlock.querySelector('#housing-price');
  var rooms = filterBlock.querySelector('#housing-rooms');
  var guests = filterBlock.querySelector('#housing-guests');

  var filteredByType = window.offers;
  var filteredByPrice = [];
  var filteredByRooms = [];
  var filteredByGuests = [];
  var filteredByFeatures = [];
  var filtered = [];

  window.onLoad = filters.forEach(function (filter) {
    filter.setAttribute('disabled', 'disabled');
  });

  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, filterActivate);
  });

  var filterActivate = function () {
    var card = document.getElementsByClassName('popup--ad');
    if (window.dataLoaded === true) {
      filters.forEach(function (filter) {
        filter.removeAttribute('disabled', 'disabled');
        filter.addEventListener('change', function () {
          if (card.length > 0) {
            document.querySelector('.popup--ad').remove();
          }
        });
      });
    }
  };

  var filterByType = function () {
    if (type.value === 'any') {
      filteredByType = window.offers;
    } else {
      filteredByType = window.offers.filter(function (advert) {
        return advert.offer.type === type.value;
      });
    }
    filtered = filteredByType;
  };

  var filterByPrice = function () {
    if (price.value === 'any') {
      filteredByPrice = filtered;
    } else if (price.value === 'middle') {
      filteredByPrice = filtered.filter(function (advert) {
        return (advert.offer.price >= Price.LOW && advert.offer.price <= Price.HIGH);
      });
    } else if (price.value === 'low') {
      filteredByPrice = filtered.filter(function (advert) {
        return advert.offer.price <= Price.LOW;
      });
    } else if (price.value === 'high') {
      filteredByPrice = filtered.filter(function (advert) {
        return advert.offer.price >= Price.HIGH;
      });
    }
    filtered = filteredByPrice;
  };

  var filterByRooms = function () {
    if (rooms.value === 'any') {
      filteredByRooms = filtered;
    } else {
      filteredByRooms = filtered.filter(function (advert) {
        return advert.offer.rooms === parseInt(rooms.value, 10);
      });
    }
    filtered = filteredByRooms;
  };

  var filterByGuests = function () {
    if (guests.value === 'any') {
      filteredByGuests = filteredByRooms;
    } else {
      filteredByGuests = filtered.filter(function (advert) {
        return advert.offer.guests === parseInt(guests.value, 10);
      });
    }
    filtered = filteredByGuests;
  };

  var filterByFeatures = function () {

    var checkboxList = Array.from(filterBlock.querySelectorAll('input[type=checkbox]:checked'));

    filteredByFeatures = filtered.filter(function (advert) {
      return checkboxList.every(function (filterValue) {
        return advert.offer.features.includes(filterValue.value);
      });
    });

    filtered = filteredByFeatures;
  };

  var filter = function () {
    filterByType();
    filterByPrice();
    filterByRooms();
    filterByGuests();
    filterByFeatures();
  };

  filterBlock.addEventListener('change', function () {
    updatePins();
  });

  var updatePins = window.debounce(function () {
    filter();
    document.querySelectorAll('.map__pin--card').forEach(function (pin) {
      pin.remove();
    });
    window.showPins(filtered);
  });

  window.filters = {
    block: filterBlock,
    inputs: filters
  };
})();
