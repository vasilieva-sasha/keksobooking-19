'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea, button');
  var adFormInputAddress = adForm.querySelector('input[name=address]');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

  var onWindowLoad = function (collection) {
    window.onLoad = collection.forEach(function (collectionItem) {
      collectionItem.setAttribute('disabled', 'disabled');
    });
  };

  onWindowLoad(adFormInputs);

  adFormInputAddress.value = window.pin.toolAddress();

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormInputAddress.setAttribute('readonly', true);
    adFormInputs.forEach(function (input) {
      input.removeAttribute('disabled', 'disabled');
      adFormInputAddress.setAttribute('readonly', true);
    });
    window.validation.check();
  };

  var disablePage = function () {
    window.map.disabled = true;
    var card = document.querySelector('.popup--ad');
    var pins = document.querySelectorAll('.map__pin--card');

    pins.forEach(function (pin) {
      pin.remove();
    });
    if (card) {
      card.remove();
    }
    window.dataLoaded = false;
    window.map.block.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    adFormInputAddress.value = window.pin.toolAddress();
    window.filters.block.reset();
    window.filters.inputs.forEach(function (filter) {
      filter.setAttribute('disabled', 'disabled');
      filter.removeEventListener('change', function () {
        document.querySelector('.popup--ad').remove();
      });
    });
    window.pin.tool.style.left = '570px';
    window.pin.tool.style.top = '375px';
    window.pin.get();
  };

  adForm.addEventListener('submit', function (evt) {
    window.post.upload(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  var onSuccess = function () {
    window.post.respond(messageSuccessTemplate, disablePage);
  };

  var onError = function () {
    window.post.respond(messageErrorTemplate, function () {
      window.post.close(messageErrorTemplate);
    });
  };

  adForm.addEventListener('change', function () {
    window.validation.check();
  });

  adFormReset.addEventListener('click', disablePage);

  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, activateForm);
  });

  window.pin.tool.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateForm);
  });

  window.form = {
    activate: activateForm
  };
})();
