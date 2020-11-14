export const getTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes =
    new Date(date).getMinutes() === 0 ? '00' : new Date(date).getMinutes();
  return `${hours}:${minutes}`;
};

const daysOfWeek = {
  0: 'вс',
  1: 'пн',
  2: 'вт',
  3: 'ср',
  4: 'чт',
  5: 'пт',
  6: 'сб',
};

const months = {
  0: 'янв.',
  1: 'февр.',
  2: 'март.',
  3: 'апрл.',
  4: 'май',
  5: 'июнь',
  6: 'июль',
  7: 'авг.',
  8: 'сент.',
  9: 'окт.',
  10: 'ноябр.',
  11: 'декабр.',
};

export const getData = (date) => {
  const number = new Date(date).getDate();
  const month = months[new Date(date).getMonth()];
  const dayOfWeek = daysOfWeek[new Date(date).getDay()];

  return `${number}${month} ${dayOfWeek}`;
};

export const convierNumberMinutesToHours = (number) => {
  const hours = Math.floor(number / 60);
  const minutes = number - hours * 60;
  if (hours) {
    return `${hours} ч ${minutes} мин`;
  } else {
    return `${number} мин`;
  }
};

export const sortFlights = (arr, typeOfSorting) => {
  switch (typeOfSorting) {
    case 'fromLessToMore':
      return [
        ...arr.sort(
          (a, b) =>
            a.flight.price.totalFeeAndTaxes.amount -
            b.flight.price.totalFeeAndTaxes.amount
        ),
      ];
    case 'fromMoreToLess':
      return [
        ...arr.sort(
          (a, b) =>
            b.flight.price.totalFeeAndTaxes.amount -
            a.flight.price.totalFeeAndTaxes.amount
        ),
      ];
    case 'byTime':
      return [
        ...arr.sort(
          (a, b) =>
            a.flight.legs.reduce((a, b) => a.duration + b.duration) -
            b.flight.legs.reduce((a, b) => a.duration + b.duration)
        ),
      ];
    default:
      return arr;
  }
};

export const filterByNumberOfTransfers = (arr, number) => {
  switch (number) {
    case 'all':
      return arr;
    case '1':
      return arr.filter((el) => el.flight.legs.segments.length > 1);
    case '0':
      return arr.filter((el) => el.flight.legs.segments.length === 1);
    default:
      return arr;
  }
};

export const filterByPrice = (arr, { min, max }) =>
  arr.filter(
    ({ flight }) =>
      flight.price.totalFeeAndTaxes.amount > min &&
      flight.price.totalFeeAndTaxes.amount < max
  );

export const removeDuplicates = (arr) => {
  const result = [];

  // Перебираем каждый элемент в исходном массиве
  arr.forEach((current) => {
    if (result.find((e) => e.name === current.name)) {
      return;
    }

    result.push(current);
  });
  return result;
};
