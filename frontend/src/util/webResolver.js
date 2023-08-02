const resolveWeb = (web) => {
  if (web.includes('www.amazon', 0)) {
    return 'Amazon';
  }
  if (web.includes('www.bodytone.eu', 0)) {
    return 'Bodytone';
  }
  return 'Unknown Web';
};

export default resolveWeb;
