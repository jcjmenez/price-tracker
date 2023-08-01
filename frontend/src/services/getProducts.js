const getProducts = async (setProducts) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get-products', {
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
