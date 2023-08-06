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
  const [dateRangeHistory, setDateRangeHistory] = useState([]);

  useEffect(() => {
    getProductPriceHistory(id, setProductPriceHistory);
  }, []);

  useEffect(() => {
    setDateRangeHistory(productPriceHistory);
  }, [productPriceHistory]);

  useEffect(() => {
    setDateRangeHistory(productPriceHistory);
    if (dateRange === 0) return;
    const historyWithRange = dateRangeHistory.filter((item) => {
      const date = new Date(item.date);
      const today = new Date();
      const range = new Date(today.setMonth(today.getMonth() - dateRange));
      return date > range;
    });
    setDateRangeHistory(historyWithRange);
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
          history={dateRangeHistory}
          web={web}
        />
        <PriceHistoryChart
          history={dateRangeHistory}
          web={web}
        />
        <DateSlider setDateRange={setDateRange} />
      </div>
    </div>
  );
}

export default ProductCard;
