export const SAVE_EMAIL = 'SAVE_EMAIL';

export const emailSubmit = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});
