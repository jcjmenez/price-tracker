import React, { useEffect, useState } from 'react';
import PriceHistory from './PriceHistory';
import resolveWeb from '../util/webResolver';
import getProductPriceHistory from '../services/getProductPriceHistory';
import './ProductCard.css';

function ProductCard({
  id, url, name, web, image,
}) {
  const [productPriceHistory, setProductPriceHistory] = useState([]);
  useEffect(() => {
    getProductPriceHistory(id, setProductPriceHistory);
  }, []);

  useEffect(() => {
  }, [productPriceHistory]);
  return (
    <div className="product-card" key={id}>
      <div className="product-details">
        <div className="product-name">
          <a href={url}>{name}</a>
          <div className="product-web">{`${resolveWeb(web)} Price History`}</div>
        </div>
      </div>
      <div className="product-view">
        <div className="image-wrapper">
          <img src={image} alt="product-img" className="preview-img" />
        </div>
        <PriceHistory
          history={productPriceHistory}
          web={web}
        />
      </div>
    </div>
  );
}

export default ProductCard;
