import { DEFAULT_AMAZON, DEFAULT_BODYTONE } from './const';

const resolveWeb = (web) => {
  if (web.includes(DEFAULT_AMAZON, 0)) {
    return 'Amazon';
  }
  if (web.includes(DEFAULT_BODYTONE, 0)) {
    return 'Bodytone';
  }
  return 'Unknown Web';
};

export default resolveWeb;
