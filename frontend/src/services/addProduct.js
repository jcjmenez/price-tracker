import { API_URL } from '../util/const';

const addProduct = async (data) => {
  try {
    const response = await fetch(`${API_URL}/add-product`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

export default addProduct;
