import React, { useEffect, useState } from 'react';
import PriceHistoryChart from './PriceHistoryChart';
import resolveWeb from '../util/webResolver';
import getProductPriceHistory from '../services/getProductPriceHistory';
import './ProductCard.css';
import PriceHistoryTable from './PriceHistoryTable';
import DateSlider from './DateSlider';

function ProductCard({
  id, url, name, web, image,
}) {
  const [productPriceHistory, setProductPriceHistory] = useState([]);
  const [dateRange, setDateRange] = useState(5);
  const [productDateRangeHistory, setProductDateRangeHistory] = useState([]);

  useEffect(() => {
    getProductPriceHistory(id, setProductPriceHistory);
  }, []);

  useEffect(() => {
    setProductDateRangeHistory(productPriceHistory);
  }, [productPriceHistory]);

  useEffect(() => {
    setProductDateRangeHistory(productPriceHistory);
    if (dateRange === 0) return;
    const today = new Date();
    const range = new Date(today.setMonth(today.getMonth() - dateRange));
    const historyWithRange = productDateRangeHistory.filter((item) => {
      const date = new Date(item.date);
      return date > range;
    });
    setProductDateRangeHistory(historyWithRange);
  }, [dateRange]);
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
        <PriceHistoryTable
          history={productDateRangeHistory}
          web={web}
        />
        <PriceHistoryChart
          history={productDateRangeHistory}
          web={web}
        />
        <DateSlider setDateRange={setDateRange} />
      </div>
    </div>
  );
}

export default ProductCard;
