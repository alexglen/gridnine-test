export const getFlightsInformation = async () => {
  const res = await fetch('./flights.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (res.ok) {
    return res.json();
  }
};
