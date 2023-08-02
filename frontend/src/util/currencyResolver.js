const resolveCurrency = (web) => {
  if (web.includes('www.amazon.es', 0) || web.includes('www.bodytone.eu', 0)) {
    return '€';
  }
  return '$';
};

export default resolveCurrency;
