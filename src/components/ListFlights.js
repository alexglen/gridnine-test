import React from 'react';
import FlightInfo from './FlightInfo';

const ListFlights = ({ data, limit }) => {
  if (!data.length) {
    return (
      <h2 className="message-no-data">По Вашему запросу ничего не найдено</h2>
    );
  }
  return (
    <div className="list-flights">
      {data.slice(0, limit).map(({ flight, flightToken }) => (
        <FlightInfo key={flightToken} {...flight} />
      ))}
    </div>
  );
};

export default ListFlights;
