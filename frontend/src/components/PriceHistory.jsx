import React from 'react';
import resolveCurrency from '../util/currencyResolver';

function PriceHistory({
  price, date, web,
}) {
  return (
    <div className="product-price">
      {`${price} ${resolveCurrency(web)} - ${date}`}
    </div>
  );
}

export default PriceHistory;
