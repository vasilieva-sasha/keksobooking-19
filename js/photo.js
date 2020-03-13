'use strict';

(function () {

  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var previewAvatarImage = previewAvatar.querySelector('img');
  previewAvatarImage.removeAttribute('heigth');

  var fileChooserOffer = document.querySelector('.ad-form__input');
  var previewOffer = document.querySelector('.ad-form__photo');
  var previewOfferImage = document.createElement('img');

  previewOfferImage.setAttribute('height', '70');
  previewOffer.appendChild(previewOfferImage);


  window.photo = {
    onChooserChange: function (fileChooser, preview) {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    },
    fileChooserAvatar: fileChooserAvatar,
    previewAvatarImage: previewAvatarImage,
    fileChooserOffer: fileChooserOffer,
    previewOfferImage: previewOfferImage
  };
})();
