import React, { useEffect, useState } from 'react';
import addProduct from '../services/addProduct';
import getProducts from '../services/getProducts';
import getPriceHistory from '../services/getPriceHistory';
import './MainPage.css';
import ProductCard from '../components/ProductCard';

function MainPage() {
  const [product, setProduct] = useState('');
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    getProducts(setTrackedProducts);
  }, []);

  useEffect(() => {
    getPriceHistory(setPriceHistory);
    console.log(priceHistory);
  }, [trackedProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addProduct({ url: product });
    console.log(result);
  };

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
          <ProductCard
            id={item.id}
            url={item.url}
            name={item.name}
            web={item.web}
            image={item.image}
            priceHistory={priceHistory}
            key={item.id}
          />
        ))}

      </div>
    </>
  );
}

export default MainPage;
