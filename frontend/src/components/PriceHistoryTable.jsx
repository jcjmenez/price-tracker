import React, { useState, useEffect } from 'react';
import './PriceHistoryTable.css';
import resolveCurrency from '../util/currencyResolver';

function PriceHistoryTable({ history, web }) {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (history.length === 0) return;
    let min = Number.MAX_VALUE;
    let minDate = '';
    let max = Number.MIN_VALUE;
    let maxDate = '';
    let avg = 0;
    history.forEach((item) => {
      if (item.price < min) {
        min = item.price;
        minDate = item.date;
      }
      if (item.price > max) {
        max = item.price;
        maxDate = item.date;
      }
      avg += item.price;
    });
    avg /= history.length;
    avg = avg.toFixed(2);
    const current = history[history.length - 1].price;

    setPrices([{
      id: 1, type: 'Current', price: current, date: '-',
    }, {
      id: 2, type: 'Highest', price: max, date: maxDate,
    }, {
      id: 3, type: 'Lowest', price: min, date: minDate,
    }, {
      id: 4, type: 'Avg', price: avg, date: '-',
    }]);
  }, [history]);

  return (
    <div className="">
      <table className="price-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item) => (
            <tr key={item.id} className={item.type}>
              <td>{item.type}</td>
              <td>{`${item.price} ${resolveCurrency(web)}`}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriceHistoryTable;
