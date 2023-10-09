import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import addProduct from '../services/addProduct';
import 'react-toastify/dist/ReactToastify.css';

import './ProductInput.css';

function ProductInput() {
  const [product, setProduct] = useState('');

  const notifySuccess = () => toast.success('Product Added');
  const notifyError = () => toast.error("Couldn't add product");
  const notifyInfo = () => toast.info('Product already exists');

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ url: product }).then((result) => {
      if (result.message === 'Product already exists') {
        notifyInfo();
      } else if (result.message !== 'Product added successfully') {
        notifyError();
      } else {
        notifySuccess();
      }
    });
  };

  return (
    <div>
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
        <ToastContainer
          theme="dark"
        />

      </div>
    </div>

  );
}

export default ProductInput;
