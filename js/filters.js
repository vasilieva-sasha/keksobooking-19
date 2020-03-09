'use strict';

(function () {

  // PRICE = ['any', 'middle', 'low', 'high'];

  var filterBlock = document.querySelector('.map__filters');
  var filters = filterBlock.querySelectorAll('input, select');
  var type = filterBlock.querySelector('#housing-type');
  var price = filterBlock.querySelector('#housing-price');
  var rooms = filterBlock.querySelector('#housing-rooms');
  var guests = filterBlock.querySelector('#housing-guests');
  var features = filterBlock.querySelectorAll('input[name=features]');

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
      filteredByType = window.offers.filter(function (it) {
        return it.offer.type === type.value;
      });
    }
    filtered = filteredByType;
  };

  var filterByPrice = function () {
    if (price.value === 'any') {
      filteredByPrice = filtered;
    } else if (price.value === 'middle') {
      filteredByPrice = filtered.filter(function (it) {
        return (it.offer.price >= 10000 && it.offer.price <= 50000);
      });
    } else if (price.value === 'low') {
      filteredByPrice = filtered.filter(function (it) {
        return it.offer.price <= 10000;
      });
    } else if (price.value === 'high') {
      filteredByPrice = filtered.filter(function (it) {
        return it.offer.price >= 50000;
      });
    }
    filtered = filteredByPrice;
  };

  var filterByRooms = function () {
    if (rooms.value === 'any') {
      filteredByRooms = filtered;
    } else {
      filteredByRooms = filtered.filter(function (it) {
        return it.offer.rooms === parseInt(rooms.value, 10);
      });
    }
    filtered = filteredByRooms;
  };

  var filterByGuests = function () {
    if (guests.value === 'any') {
      filteredByGuests = filteredByRooms;
    } else {
      filteredByGuests = filtered.filter(function (it) {
        return it.offer.guests === parseInt(guests.value, 10);
      });
    }
    filtered = filteredByGuests;
  };

  var filterByFeatures = function () {
    features.forEach(function (checkbox) {
      if (checkbox.checked) {
        filteredByFeatures = filtered.filter(function (it) {
          return it.offer.features.indexOf(checkbox.value) === -1;
        });
      } else {
        filteredByFeatures = filtered.filter(function (it) {
          return it.offer.features.indexOf(checkbox.value) !== -1;
        });
      }
    });
    console.log(filteredByFeatures);
    filtered = filteredByFeatures;
  };

  var filter = function () {
    filterByType();
    filterByPrice();
    filterByRooms();
    filterByGuests();
    filterByFeatures();
  };

  type.addEventListener('change', function () {
    updatePins();
  });

  price.addEventListener('change', function () {
    updatePins();
  });

  rooms.addEventListener('change', function () {
    updatePins();
  });

  guests.addEventListener('change', function () {
    updatePins();
  });

  features.forEach(function (feature) {
    feature.addEventListener('change', function () {
      updatePins();
    });
    console.log(filtered);
  });

  function updatePins() {
    filter();
    document.querySelectorAll('.map__pin--card').forEach(function (pin) {
      pin.remove();
    });
    window.showPins(filtered);
  }

  window.filters = {
    block: filterBlock,
    inputs: filters
  };
})();
