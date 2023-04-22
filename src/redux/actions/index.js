import fetchAPICurrencies from '../utils/fetchAPICurrencies';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CURRENCIE_CATEGORY = 'CURRENCIE_CATEGORY';

export const emailSubmit = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const getCurrencie = (currencie) => ({
  type: CURRENCIE_CATEGORY,
  payload: currencie,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await fetchAPICurrencies();
  const coins = Object.keys(data);
  const filterCoins = coins.filter((coin) => coin !== 'USDT');
  dispatch(getCurrencie(filterCoins));
};
