const checkNumber = (min, max) => {
  if (Math.sign(min) === -1 || Math.sign(max) === -1) {
    throw new Error('Negative number is not allowed');
  }

  if (min >= max) {
    throw new Error('The minimum number is greater than or equal to the maximum number');
  }
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  try {
    checkNumber(min, max);
  } catch (err) {
    console.log(err);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloating = (min, max, afterPoint) => {
  try {
    checkNumber(min, max);
  } catch (err) {
    console.log(err);
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return +result.toFixed(afterPoint);
};

getRandomNumber(1, 6);
getRandomFloating(1.5, 6.5, 1);
