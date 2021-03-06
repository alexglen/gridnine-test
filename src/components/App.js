import React, { useEffect, useState } from 'react';
import { getFlightsInformation } from '../actions';
import Aside from './Aside';
import ListFlights from './ListFlights';
import Loader from './Loader';
import { Button } from '@material-ui/core';
import {
  filterByNumberOfTransfers,
  sortFlights,
  filterByPrice,
  names,
  filterByAirline,
} from '../utils';
import '../index.css';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [limit, setLimit] = useState(5);
  const [typeOfSorting, setTypeOfSorting] = useState('');

  const [numberOfTransfers, setNumberOfTransfers] = useState({
    withTransfer: true,
    withoutTransfer: true,
  });

  const [price, setPrice] = useState({
    max: 10000000,
    min: 0,
  });

  const [airLines, setAirLines] = useState(names);

  useEffect(() => {
    getFlightsInformation().then(({ result }) => setFlights(result.flights));
  }, []);

  const flightsAfterFilteredByAirlines = filterByAirline(flights, airLines);

  const flightsAfterSorting = sortFlights(
    flightsAfterFilteredByAirlines,
    typeOfSorting
  );

  const flightsAfterFilteredOfTransfers = filterByNumberOfTransfers(
    flightsAfterSorting,
    numberOfTransfers
  );

  const flightsAfterFilteredByPrice = filterByPrice(
    flightsAfterFilteredOfTransfers,
    price
  );

  if (!flights.length) {
    return <Loader />;
  }

  return (
    <div className="app">
      <div className="aside">
        <Aside
          typeOfSorting={typeOfSorting}
          setTypeOfSorting={setTypeOfSorting}
          numberOfTransfers={numberOfTransfers}
          setNumberOfTransfers={setNumberOfTransfers}
          setPrice={setPrice}
          listOfCompanies={flights.map(({ flight }) => ({
            name: flight.carrier.caption,
            price: flight.price.totalFeeAndTaxes.amount,
          }))}
          setAirLines={setAirLines}
        />
      </div>
      <div className="main-part">
        <ListFlights data={flightsAfterFilteredByPrice} limit={limit} />

        {flightsAfterFilteredByPrice.length / limit > 1 ? (
          <div className="button-loading">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLimit((p) => p + 3)}
            >
              Загрузить ещё
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
