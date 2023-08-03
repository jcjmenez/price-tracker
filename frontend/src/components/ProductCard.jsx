import React from 'react';
import PriceHistory from './PriceHistory';
import resolveWeb from '../util/webResolver';
import './ProductCard.css';

function ProductCard({
  id, url, name, web, image, priceHistory,
}) {
  return (
    <div className="product-card" key={id}>
      <div className="product-details">
        <div className="product-name">
          <a href={url}>{name}</a>
          <div className="product-web">{`${resolveWeb(web)} Price History`}</div>
        </div>
      </div>
      <div className="product-view">
        <img src={image} alt="product-img" className="preview-img" />
        {priceHistory.map((price) => (
          price.product_id === id && (
          <PriceHistory
            price={price.price}
            date={price.date}
            web={web}
            key={price.id}
          />
          )
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
