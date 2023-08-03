import { AMAZON_SPAIN, DEFAULT_BODYTONE } from './const';

const resolveCurrency = (web) => {
  if (web.includes(AMAZON_SPAIN, 0) || web.includes(DEFAULT_BODYTONE, 0)) {
    return '€';
  }
  return '$';
};

export default resolveCurrency;
