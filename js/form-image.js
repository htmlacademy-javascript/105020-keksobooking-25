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

const checkImage = (selector, previewImg,) => {
  const fileChooser = document.querySelector(selector);
  const preview = document.querySelector(previewImg);
  const {AVATAR, IMAGES} = ImageOptions;

  const selectInput = () => {
    switch (selector) {
      case AVATAR.select:
        return AVATAR;
      case IMAGES.select:
        return IMAGES;
    }
  };

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
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
  });
};

const resetDivPreview = () => {
  const {AVATAR} = ImageOptions;
  const avatar = document.querySelector('.ad-form-header__preview');
  const img = document.createElement('img');
  img.src = AVATAR.src;
  img.width = AVATAR.width;
  img.height = AVATAR.height;
  img.alt = AVATAR.alt;
  avatar.innerHTML = '';
  avatar.appendChild(img);

  const photo = document.querySelector('.ad-form__photo');
  photo.innerHTML = '';
};

export {
  checkImage,
  resetDivPreview,
};
