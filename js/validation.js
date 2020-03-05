'use strict';

(function () {
  var FLAT_PRICE = 1000;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;
  var TWELVE_TIME = '12:00';
  var THIRTEEN_TIME = '13:00';
  var FOURTEEN_TIME = '14:00';

  var adForm = document.querySelector('.ad-form');
  var adFormSelectRooms = adForm.querySelector('select[name=rooms]');
  var adFormSelectCapacity = adForm.querySelector('select[name=capacity]');
  var adFormSelectType = adForm.querySelector('select[name=type]');
  var adFormInputPrice = adForm.querySelector('input[name=price]');
  var adFormSelectTimeIn = adForm.querySelector('select[name=timein]');
  var adFormSelectTimeOut = adForm.querySelector('select[name=timeout]');
  var adFormOptionsTimeOut = adFormSelectTimeOut.querySelectorAll('option');

  var checkValidityGuests = function () {
    if (adFormSelectCapacity.value === '0' && adFormSelectRooms.value !== '100') {
      adFormSelectCapacity.setCustomValidity('Выберите количество гостей!');
    } else if (adFormSelectRooms.value === '100' && adFormSelectCapacity.value !== '0') {
      adFormSelectCapacity.setCustomValidity('Размещение гостей невозможно!');
    } else if (adFormSelectRooms.value < adFormSelectCapacity.value) {
      adFormSelectCapacity.setCustomValidity('Слишком много гостей!');
    } else {
      adFormSelectCapacity.setCustomValidity('');
    }
  };

  var checkValidityPrice = function () {
    if (adFormSelectType.value === 'bungalo') {
      adFormInputPrice.setAttribute('placeholder', '0');
    } else if (adFormSelectType.value === 'flat') {
      adFormInputPrice.setAttribute('placeholder', FLAT_PRICE);
      adFormInputPrice.setAttribute('min', FLAT_PRICE);
    } else if (adFormSelectType.value === 'house') {
      adFormInputPrice.setAttribute('placeholder', HOUSE_PRICE);
      adFormInputPrice.setAttribute('min', HOUSE_PRICE);
    } else if (adFormSelectType.value === 'palace') {
      adFormInputPrice.setAttribute('placeholder', PALACE_PRICE);
      adFormInputPrice.setAttribute('min', PALACE_PRICE);
    }
    adFormSelectType.addEventListener('change', function () {
      checkValidityPrice();
    });
  };

  var setTimeDisabled = function (time) {
    adFormOptionsTimeOut.forEach(function (option) {
      option.removeAttribute('disabled', 'disabled');
    });
    adFormSelectTimeOut.value = time;
    adFormOptionsTimeOut.forEach(function (option) {
      if (option.value !== time) {
        option.setAttribute('disabled', 'disabled');
      }
    });
  };

  var checkValidityTime = function () {
    if (adFormSelectTimeIn.value === TWELVE_TIME) {
      setTimeDisabled(TWELVE_TIME);
    } else if (adFormSelectTimeIn.value === THIRTEEN_TIME) {
      setTimeDisabled(THIRTEEN_TIME);
    } else if (adFormSelectTimeIn.value === FOURTEEN_TIME) {
      setTimeDisabled(FOURTEEN_TIME);
    }
  };

  window.validation = {
    check: function () {
      checkValidityGuests();
      checkValidityPrice();
      checkValidityTime();
    }
  };
})();