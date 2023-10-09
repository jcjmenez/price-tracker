import React, { useEffect, useState } from 'react';
import getProducts from '../services/getProducts';
import './MainPage.css';
import ProductCard from '../components/ProductCard';
import ProductInput from '../components/ProductInput';

function MainPage() {
  const [trackedProducts, setTrackedProducts] = useState([]);

  useEffect(() => {
    getProducts(setTrackedProducts);
  }, []);

  return (
    <>
      <ProductInput />
      <div className="tracked-products">
        {trackedProducts.map((item) => (
          <ProductCard
            id={item.id}
            url={item.url}
            name={item.name}
            web={item.web}
            image={item.image}
            key={item.id}
          />
        ))}

      </div>
    </>
  );
}

export default MainPage;
