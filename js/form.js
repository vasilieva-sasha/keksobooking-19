'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea, button');
  var adFormInputAddress = adForm.querySelector('input[name=address]');
  var adFormSelectRooms = adForm.querySelector('select[name=rooms]');
  var adFormSelectCapacity = adForm.querySelector('select[name=capacity]');

  var onWindowLoad = function (collection) {
    window.onLoad = collection.forEach(function (collectionItem) {
      collectionItem.setAttribute('disabled', 'disabled');
    });
  };

  onWindowLoad(adFormInputs);

  var checkValidity = function () {
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

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormInputs.forEach(function (input) {
      input.removeAttribute('disabled', 'disabled');
    });
    checkValidity();
  };

  adForm.addEventListener('change', function () {
    checkValidity();
  });

  adFormInputAddress.value = window.pin.mainPinAddress;

  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, activateForm());
  });

  window.pin.tool.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateForm());
  });

})();
