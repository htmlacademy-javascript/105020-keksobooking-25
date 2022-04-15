const FiltersOptions = {
  PIN_MAX: 10,
};

const filterHousingType = (data) => {
  const housingType = document.querySelector('#housing-type');
  if (housingType.value === 'any') {
    return true;
  }
  if (housingType.value === data.offer.type) {
    return true;
  }
};
//TODO
const mapFilters = (data) => {
  const {PIN_MAX} = FiltersOptions;
  const result = data
    .slice()
    .filter(filterHousingType);
    // .slice(0, PIN_MAX) //FIXME
  console.log(result); //FIXME
  return result;
};

export {
  mapFilters
};
