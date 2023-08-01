const resolve = (web) => {
  if (web.includes('www.amazon', 0)) {
    return 'Amazon';
  }
  return 'Unknown';
};

export default resolve;
