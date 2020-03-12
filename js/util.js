'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;
  var adForm = document.querySelector('.ad-form');
  var adFormInputAddress = adForm.querySelector('input[name=address]');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isLeftMouseEvent: function (evt, action) {
      if (evt.button === LEFT_MOUSE_BUTTON) {
        action();
      }
    },
    isEscapeEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    disablePage: function () {
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
      window.form.block.classList.add('ad-form--disabled');
      window.form.block.reset();
      window.filters.block.reset();
      window.pin.tool.removeEventListener('mousedown', window.util.isLeftMouseEvent);
      window.filters.inputs.forEach(function (filter) {
        filter.setAttribute('disabled', 'disabled');
        filter.removeEventListener('change', window.filters.onChange);
      });
      window.filters.block.removeEventListener('change', window.filters.updatePins);
      window.pin.tool.style.left = window.pin.Main.LEFT + 'px';
      window.pin.tool.style.top = window.pin.Main.TOP + 'px';
      adFormInputAddress.value = window.pin.toolAddressInactive();
      window.photo.fileChooserAvatar.removeEventListener('change', window.photo.onChooserChange);
      window.photo.fileChooserOffer.removeEventListener('change', window.photo.onChooserChange);
      window.form.block.removeEventListener('change', window.validation.check);
      window.form.block.removeEventListener('submit', window.form.onSubmit);
      adFormReset.removeEventListener('click', window.util.disablePage);
      window.pin.get();
    }
  };

})();
