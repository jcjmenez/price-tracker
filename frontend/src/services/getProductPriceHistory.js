import { API_URL } from '../util/const';

const getProductPriceHistory = async (productId, setPriceHistory) => {
  try {
    const response = await fetch(`${API_URL}/get-price-history/${productId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    setPriceHistory(result.price_history);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
};

export default getProductPriceHistory;
