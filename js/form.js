'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea, button');
  var adFormInputAddress = adForm.querySelector('input[name=address]');

  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

  var onToolClick = window.pin.onToolClick;

  var onWindowLoad = function (collection) {
    window.onLoad = collection.forEach(function (collectionItem) {
      collectionItem.setAttribute('disabled', 'disabled');
    });
  };

  onWindowLoad(adFormInputs);

  adFormInputAddress.value = window.pin.toolAddress();

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormInputs.forEach(function (input) {
      input.removeAttribute('disabled', 'disabled');
      adFormInputAddress.setAttribute('disabled', 'disabled');
    });
    window.validation.check();
  };

  var disablePage = function () {
    var card = document.querySelector('.popup--ad');
    var pins = document.querySelectorAll('.map__pin--card');
    pins.forEach(function (pin) {
      pin.remove();
    });
    if (card) {
      card.remove();
    }
    window.map.block.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    adFormInputAddress.value = window.pin.toolAddress();
    window.pin.tool.style.left = '570px';
    window.pin.tool.style.top = '375px';
    window.pin.tool.addEventListener('mousedown', function (evt) {
      window.util.isLeftMouseEvent(evt, onToolClick);
    });

    window.pin.tool.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, onToolClick);
    });
  };

  adForm.addEventListener('submit', function (evt) {
    window.post.upload(new FormData(adForm), function (response) {
      if (response) {
        window.post.respond(messageSuccessTemplate, disablePage);
      } else {
        window.post.respond(messageErrorTemplate, function () {
          window.post.close(messageErrorTemplate);
        });
      }
    });
    evt.preventDefault();
  });

  adForm.addEventListener('change', function () {
    window.validation.check();
  });

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
