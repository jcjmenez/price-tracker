import {
  AMAZON_SPAIN, CARREFOUR_SPAIN, DEFAULT_BACKMARKET, DEFAULT_BODYTONE,
} from './const';

const resolveCurrency = (web) => {
  if (web.includes(AMAZON_SPAIN, 0)
  || web.includes(DEFAULT_BODYTONE, 0)
  || web.includes(DEFAULT_BACKMARKET, 0)
  || web.includes(CARREFOUR_SPAIN, 0)) {
    return '€';
  }
  return '$';
};

export default resolveCurrency;
