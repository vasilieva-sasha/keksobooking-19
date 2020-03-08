'use strict';

(function () {

  var filterBlock = document.querySelector('.map__filters');
  var filters = filterBlock.querySelectorAll('input, select');
  var type = filterBlock.querySelector('#housing-type');

  var filteredByType = [];

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

  type.addEventListener('change', function () {
    if (type.value === 'any') {
      filteredByType = window.offers;
    } else {
      var option = type.value;
      filteredByType = window.offers.filter(function (it) {
        return it.offer.type === option;
      });
    }
    updatePins();
  });

  function updatePins() {
    document.querySelectorAll('.map__pin--card').forEach(function (pin) {
      pin.remove();
    });
    window.showPins(filteredByType);
  }

  window.filters = {
    block: filterBlock,
    inputs: filters
  };
})();
