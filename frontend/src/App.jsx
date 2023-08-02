import React, { useEffect, useState } from 'react';
import addProduct from './services/addProduct';
import getProducts from './services/getProducts';
import getPriceHistory from './services/getPriceHistory';
import resolveWeb from './util/webResolver';
import resolveCurrency from './util/currencyResolver';

import './App.css';

function App() {
  const [product, setProduct] = useState('');
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProduct({ url: product });
    console.log(result);
  };

  useEffect(() => {
    getProducts(setTrackedProducts);
  }, []);

  useEffect(() => {
    getPriceHistory(setPriceHistory);
    console.log(priceHistory);
  }, [trackedProducts]);

  return (
    <>
      <div className="top-nav">
        <input
          type="text"
          className="product-input"
          placeholder="Enter Product URL"
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Add Product
        </button>

      </div>
      <div className="tracked-products">
        {trackedProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="product-details">
              <div className="product-name">
                <a href={item.url}>{item.name}</a>
                <div className="product-web">{`${resolveWeb(item.web)} Price History`}</div>
              </div>
            </div>
            <div className="product-view">
              <img src={item.image} alt="product-img" className="preview-img" />
              {priceHistory.map((price) => (
                price.product_id === item.id && (
                  <div className="product-price" key={price.id}>
                    {`${price.price} ${resolveCurrency(item.web)} - ${price.date}`}
                  </div>
                )
              ))}
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default App;
