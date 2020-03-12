'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input, select, textarea, button');
  var adFormInputAddress = adForm.querySelector('input[name=address]');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

  var onWindowLoad = function (collection) {
    collection.forEach(function (collectionItem) {
      collectionItem.setAttribute('disabled', 'disabled');
    });
    adFormInputAddress.value = window.pin.toolAddressInactive();
  };

  window.onLoad = onWindowLoad(adFormInputs);

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormInputAddress.value = window.pin.toolAddress();
    adFormInputs.forEach(function (input) {
      input.removeAttribute('disabled', 'disabled');
      adFormInputAddress.setAttribute('readonly', true);
    });
    window.photo.fileChooserAvatar.addEventListener('change', function () {
      window.photo.onChooserChange(window.photo.fileChooserAvatar, window.photo.previewAvatarImage);
    });
    window.photo.fileChooserOffer.addEventListener('change', function () {
      window.photo.onChooserChange(window.photo.fileChooserOffer, window.photo.previewOfferImage);
    });
    window.validation.check();
    adForm.addEventListener('change', window.validation.check);
    adForm.addEventListener('submit', onSubmit);
    adFormReset.addEventListener('click', window.util.disablePage);
  };

  var onSubmit = function (evt) {
    window.post.upload(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  };

  var onSuccess = function () {
    window.post.respond(messageSuccessTemplate, window.util.disablePage);
  };

  var onError = function () {
    window.post.respond(messageErrorTemplate, function () {
      window.post.close(messageErrorTemplate);
    });
  };

  window.pin.tool.addEventListener('mousedown', function (evt) {
    window.util.isLeftMouseEvent(evt, activateForm);
  });

  window.pin.tool.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateForm);
  });

  window.form = {
    activate: activateForm,
    adress: adFormInputAddress,
    block: adForm,
    onSubmit: onSubmit
  };
})();
