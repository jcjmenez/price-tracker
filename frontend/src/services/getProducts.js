import { API_URL } from '../util/const';

const getProducts = async (setProducts) => {
  try {
    const response = await fetch(`${API_URL}/get-products`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    setProducts(result.products);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

export default getProducts;
