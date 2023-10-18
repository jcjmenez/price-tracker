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
        {trackedProducts.length > 0 ? trackedProducts.map((item) => (
          <ProductCard
            id={item.id}
            url={item.url}
            name={item.name}
            web={item.web}
            image={item.image}
            key={item.id}
          />
        )) : 'No tracked products'}

      </div>
    </>
  );
}

export default MainPage;
