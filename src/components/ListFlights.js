import React from 'react';
import FlightInfo from './FlightInfo';

const ListFlights = ({ data, limit }) => {
  console.log(data.length);
  console.log(data);
  return (
    <div className="list-flights">
      {data.slice(0, limit).map(({ flight, flightToken }) => (
        <FlightInfo key={flightToken} {...flight} />
      ))}
    </div>
  );
};

export default ListFlights;
