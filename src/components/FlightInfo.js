import React from 'react';
import { Button } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { convierNumberMinutesToHours, getData, getTime } from '../utils';
import '../index.css';

const FlightInfo = ({ legs, price, carrier }) => {
  return (
    <div>
      {legs?.length &&
        legs.map((leg, index) => (
          <div className="flight-info" key={index}>
            <div>
              <header>
                <div className="company-name">
                  <p>{carrier.caption}</p>
                </div>
                <div>
                  <p className="price">
                    {price?.totalFeeAndTaxes?.amount &&
                      Math.round(price.totalFeeAndTaxes.amount)}
                    ₽
                  </p>
                  <p className="title">
                    Стоимость для одного взрослого человека
                  </p>
                </div>
              </header>
              <div>
                {leg?.segments?.length &&
                  leg.segments.map((segment, index) => (
                    <div className="main" key={index}>
                      <div className="destination">
                        <p>
                          <span>
                            {segment?.departureCity?.caption &&
                              segment.departureCity.caption}
                            ,&nbsp;
                            {segment.departureAirport.caption &&
                              segment.departureAirport.caption}
                          </span>
                          <span>
                            (
                            {segment?.departureAirport?.uid &&
                              segment.departureAirport.uid}
                            ) →
                          </span>
                          <span>
                            {segment?.arrivalCity?.caption &&
                              segment.arrivalCity.caption}
                            ,&nbsp;
                            {segment?.arrivalAirport?.caption &&
                              segment.arrivalAirport.caption}
                          </span>
                          <span>
                            (
                            {segment?.arrivalAirport?.uid &&
                              segment.arrivalAirport.uid}
                            )
                          </span>
                        </p>
                      </div>
                      <div className="time-info">
                        <p className="from">
                          <span>
                            {getTime(
                              segment?.departureDate && segment.departureDate
                            )}
                          </span>{' '}
                          <span>
                            {getData(
                              segment?.departureDate && segment.departureDate
                            )}
                          </span>
                        </p>
                        <p className="transfer-title">
                          <AccessTimeIcon size="medium" />{' '}
                          <span>
                            {convierNumberMinutesToHours(
                              segment?.travelDuration && segment.travelDuration
                            )}
                          </span>
                          <span className="transfer-name">
                            {leg.segments.length === 1
                              ? 'Без пересадок'
                              : '1 пересадка'}
                          </span>
                        </p>
                        <p className="to">
                          <span>
                            {getData(
                              segment?.arrivalDate && segment.arrivalDate
                            )}
                          </span>{' '}
                          <span>
                            {getTime(
                              segment?.arrivalDate && segment.arrivalDate
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flight-footer">
                        <p>
                          Рейс выполняет:
                          <span className="airline-name">
                            {segment?.airline?.caption &&
                              segment.airline.caption}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <Button variant="outlined" color="secondary" className="button">
                Выбрать
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FlightInfo;
