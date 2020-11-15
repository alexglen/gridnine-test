import React from 'react';
import { Checkbox } from '@material-ui/core';
import { removeDuplicates } from '../utils';
import '../index.css';

const AviacompaniesFilters = ({ listOfCompanies, setAirLines }) => {
  const uniqNamesOfCompanies = removeDuplicates([
    ...listOfCompanies.sort((a, b) => a.price - b.price),
  ]);

  return (
    <div className="avia-companies">
      <h3>Авиакомпании</h3>
      {uniqNamesOfCompanies.map(({ name, price }) => (
        <div key={name}>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            id={name}
            name={name}
            defaultChecked
            onChange={({ target: { checked, name } }) =>
              setAirLines((p) => ({ ...p, [name]: checked }))
            }
          />
          <label htmlFor={name}>
            {name} от <span className="sum">{price}₽</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AviacompaniesFilters;
