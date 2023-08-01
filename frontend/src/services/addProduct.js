const addProduct = async (data) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/add-product', {
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
