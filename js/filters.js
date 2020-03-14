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
  var card = document.getElementsByClassName('popup--ad');

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

  var onFilterChange = function () {
    if (card.length > 0) {
      document.querySelector('.popup--ad').remove();
    }
  };

  var filterActivate = function () {
    if (window.dataLoaded === true) {
      filters.forEach(function (filter) {
        filter.removeAttribute('disabled');
        filter.addEventListener('change', onFilterChange);
      });
      filterBlock.addEventListener('change', updatePins);
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

  var ruleFunctions = {
    'findRooms': function (advert, input) {
      return advert.offer.rooms === parseInt(input.value, 10);
    },

    'findGuests': function (advert, input) {
      return advert.offer.guests === parseInt(input.value, 10);
    }
  };

  var filterByCapacity = function (input, result, elementName) {
    if (input.value === 'any') {
      result = filtered;
    } else {
      result = filtered.filter(function (advert) {
        return ruleFunctions[elementName](advert, input);
      });
    }
    filtered = result;
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
    filterByCapacity(rooms, filteredByRooms, 'findRooms');
    filterByCapacity(guests, filteredByGuests, 'findGuests');
    filterByFeatures();
  };

  var updatePins = window.debounce(function () {
    filter();
    document.querySelectorAll('.map__pin--card').forEach(function (pin) {
      pin.remove();
    });
    window.showPins(filtered);
  });

  window.filters = {
    block: filterBlock,
    inputs: filters,
    onChange: onFilterChange,
    updatePins: updatePins
  };
})();
