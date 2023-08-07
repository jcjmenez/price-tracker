import {
  CARREFOUR_SPAIN, DEFAULT_AMAZON, DEFAULT_BACKMARKET, DEFAULT_BODYTONE,
} from './const';

const resolveWeb = (web) => {
  let webName = '';
  if (web.includes(DEFAULT_AMAZON, 0)) {
    webName = 'Amazon';
  } else if (web.includes(DEFAULT_BODYTONE, 0)) {
    webName = 'Bodytone';
  } else if (web.includes(DEFAULT_BACKMARKET, 0)) {
    webName = 'Backmarket';
  } else if (web.includes(CARREFOUR_SPAIN, 0)) {
    webName = 'Carrefour';
  } else {
    webName = 'Unknown Web';
  }
  return webName;
};

export default resolveWeb;
