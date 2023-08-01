import React, { useEffect, useState } from 'react';
import addProduct from './services/addProduct';
import getProducts from './services/getProducts';
import resolve from './util/webResolver';

import './App.css';

function App() {
  const [product, setProduct] = useState('');
  const [trackedProducts, setTrackedProducts] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProduct({ url: product });
    console.log(result);
  };

  useEffect(() => {
    getProducts(setTrackedProducts);
  }, []);

  return (
    <>
      <div className="top-nav">
        <input
          className="product-input"
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
          <div className="product-card">
            <div className="product-details">
              <div className="product-web">{`${resolve(item.web)} Price History`}</div>
              <div className="product-name">
                <a href={item.url}>{item.name}</a>
              </div>
            </div>
            <div className="product-image">
              <img src={item.image} alt="product-img" />
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default App;
