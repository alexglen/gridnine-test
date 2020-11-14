import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button, Checkbox } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import AviacompaniesFilters from './AviacompaniesFilters';
import '../index.css';

const Aside = ({
  typeOfSorting,
  setTypeOfSorting,
  setNumberOfTransfers,
  numberOfTransfers,
  setPrice,
  listOfCompanies,
}) => {
  const [priceValue, setPriceValue] = useState({
    min: 0,
    max: 1000000,
  });

  return (
    <div>
      <div className="sorting">
        <h3>Сортировать</h3>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={typeOfSorting}
            onChange={({ target: { value } }) => setTypeOfSorting(value)}
          >
            <FormControlLabel
              value="fromLessToMore"
              control={<Radio />}
              label="По возрастанию цены"
            />
            <FormControlLabel
              value="fromMoreToLess"
              control={<Radio />}
              label="По убыванию цены"
            />
            <FormControlLabel
              value="byTime"
              control={<Radio />}
              label="По времени в пути"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="filter-transfers">
        <h3>Фильтровать</h3>
        <div>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            id="transfer"
            onChange={({ target: { value } }) => setNumberOfTransfers(value)}
            value="1"
            defaultChecked
          />
          <label htmlFor="transfer">1 пересадка</label>
        </div>
        <div>
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            id="without-transfer"
            value="0"
            defaultChecked
            onChange={({ target: { value } }) => setNumberOfTransfers(value)}
          />
          <label htmlFor="without-transfer">без пересадки</label>
        </div>
        <div className="prices">
          <h3>Цена</h3>
          <div>
            <h4>От</h4>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                min="0"
                onChange={({ target: { value } }) =>
                  setPriceValue((p) => ({ ...p, min: value }))
                }
                value={priceValue.min}
                className="price-input"
              />
            </div>
            <h4>До</h4>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="number"
                onChange={({ target: { value } }) =>
                  setPriceValue((p) => ({ ...p, max: value }))
                }
                value={priceValue.max}
                className="price-input"
              />
              <div className="filter-button">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    setPrice({ min: +priceValue.min, max: +priceValue.max })
                  }
                >
                  Применить фильтр по цене
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AviacompaniesFilters listOfCompanies={listOfCompanies} />
      </div>
    </div>
  );
};

export default Aside;
