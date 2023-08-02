const getPriceHistory = async (setPriceHistory) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get-price-history', {
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

export default getPriceHistory;
