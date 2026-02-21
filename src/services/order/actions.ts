import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getFeedsApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { clearIngredient } from '../burger-constructor/slice';
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[], { dispatch }) => {
    const response = await orderBurgerApi(data);
    dispatch(clearIngredient());
    return response;
  }
);

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders;
  }
);
