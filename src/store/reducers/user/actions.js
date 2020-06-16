import * as types from './types';

export const getUserPageByNameOrAccount = item => async ({ api, dispatch }) => {
  try {
    const data = await api.post(`/auth/user/getUserPageByNameOrAccount`, item);
    dispatch({
      type: types.GET_USERS,
      data
    });
  } catch (err) {
    throw new Error(err);
  }
};
