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

  return `${number} ${month} ${dayOfWeek}`;
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

export const filterByNumberOfTransfers = (
  arr,
  { withTransfer, withoutTransfer }
) => {
  if (withTransfer && withoutTransfer) {
    return arr;
  } else if (withTransfer) {
    return arr.filter(
      (el) =>
        el.flight.legs[0].segments.length === 2 &&
        el.flight.legs[1].segments.length === 2
    );
  } else if (withoutTransfer) {
    return arr.filter(
      (el) =>
        el.flight.legs[0].segments.length === 1 &&
        el.flight.legs[1].segments.length === 1
    );
  } else {
    return [];
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

  arr.forEach((current) => {
    if (result.find((e) => e.name === current.name)) {
      return;
    }

    result.push(current);
  });
  return result;
};

export const filterByAirline = (arr, airlines) => {
  const activeAirlines = Object.entries(airlines).filter((el) => el[1]);
  const newArr = [];
  activeAirlines.forEach((e) =>
    arr.filter((el) => el.flight.carrier.caption === e[0] && newArr.push(el))
  );
  return newArr;
};

export const names = {
  'Air France': true,
  KLM: true,
  'Аэрофлот - российские авиалинии': true,
  'TURK HAVA YOLLARI A.O.': true,
  'Finnair Oyj': true,
  'Air Baltic Corporation A/S': true,
  'Alitalia Societa Aerea Italiana': true,
  'Pegasus Hava Tasimaciligi A.S.': true,
  'Brussels Airlines': true,
  'LOT Polish Airlines': true,
};
