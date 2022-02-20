const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (Math.sign(min) === -1 || Math.sign(max) === -1) {
    console.log('error:', 'Negative number is not allowed');
  }

  if (min >= max) {
    console.log('error:', 'The minimum number is greater than or equal to the maximum');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloating = (min, max) => {
  if (Math.sign(min) === -1 || Math.sign(max) === -1) {
    console.log('error:', 'Negative number is not allowed');
  }

  if (min >= max) {
    console.log('error:', 'The minimum number is greater than or equal to the maximum');
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result.toFixed(1);
};

getRandomNumber(1, 6);
getRandomFloating(1.5, 6.2);

console.log(getRandomNumber(1, 6));
console.log(getRandomFloating(1.1, 6.5));
