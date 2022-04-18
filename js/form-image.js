const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ImageOptions = {
  AVATAR: {
    width: '40',
    height: '44',
    alt: 'Аватар пользователя',
    src: 'img/muffin-grey.svg',
    select: '#avatar',

  },
  IMAGES: {
    width: '70',
    height: '70',
    alt: 'Фотография жилья',
    select: '#images',
  },
};

const
  avatar = document.querySelector('.ad-form-header__preview'),
  photo = document.querySelector('.ad-form__photo');

const checkImage = (selector, previewImg,) => {
  const fileChooser = document.querySelector(selector);
  const preview = document.querySelector(previewImg);

  const selectInput = () => {
    switch (selector) {
      case ImageOptions.AVATAR.select:
        return ImageOptions.AVATAR;
      case ImageOptions.IMAGES.select:
        return ImageOptions.IMAGES;
    }
  };

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => {
        const result = fileName.endsWith(it);
        return result;
      });

      if (matches) {
        const img = document.createElement('img');
        const input = selectInput();
        img.src = URL.createObjectURL(file);
        img.width = input.width;
        img.height = input.height;
        img.alt = input.alt;
        preview.innerHTML = '';
        preview.appendChild(img);
      }
    }
  });
};

const resetDivPreview = () => {
  const img = document.createElement('img');
  img.src = ImageOptions.AVATAR.src;
  img.width = ImageOptions.AVATAR.width;
  img.height = ImageOptions.AVATAR.height;
  img.alt = ImageOptions.AVATAR.alt;
  avatar.innerHTML = '';
  avatar.appendChild(img);
  photo.innerHTML = '';
};

export {
  checkImage,
  resetDivPreview,
};
