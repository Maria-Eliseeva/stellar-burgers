import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { TRegisterData, TLoginData } from '@api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { setUser, setIsAuthChecked } from './slice';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      await getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
