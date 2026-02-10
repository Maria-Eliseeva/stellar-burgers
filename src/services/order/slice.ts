import { TOrder, TOrdersData } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber, getOrders, createOrder, getFeeds } from './actions';

type OrderState = {
  userOrders: TOrder[];
  currentNumber: string;
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
  myOrderRequest: boolean;
  myOrderModalData: TOrder | null;
  orderInfoModalData: TOrder | null;
};

const orderData = {
  createdAt: '',
  ingredients: [],
  _id: '',
  status: '',
  name: '',
  updatedAt: 'string',
  number: 0
};

export const initialState: OrderState = {
  userOrders: [],
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null,
  currentNumber: '',
  myOrderRequest: false,
  myOrderModalData: null,
  orderInfoModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearMyOrderModalData: (state) => {
      state.myOrderModalData = null;
      state.myOrderRequest = false;
    },
    clearOrderInfoModalData: (state) => {
      state.orderInfoModalData = null;
    },
    setCurrentNumberPage: (state, action) => {
      state.currentNumber = action.payload;
    }
  },
  selectors: {
    selectUserOrders: (state) => state.userOrders,
    selectFeedOrders: (state) => state.feed.orders,
    selectFeed: (state) => state.feed,
    selectOrderError: (state) => state.error,
    selectIsLoadingOrder: (state) => state.isLoading,
    selectCurrentNumber: (state) => state.currentNumber,
    selectMyOrderRequest: (state) => state.myOrderRequest,
    selectOrderInfoModalData: (state) => state.orderInfoModalData,
    selectMyOrderModalData: (state) => state.myOrderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.myOrderRequest = true;
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myOrderRequest = false;
        state.myOrderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.myOrderRequest = false;
        state.error = action.error.message || 'createOrder rejected';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'getOrders rejected';
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'getFeeds rejected';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderInfoModalData = action.payload[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'getOrderByNumber rejected';
      });
  }
});

export const {
  selectUserOrders,
  selectIsLoadingOrder,
  selectFeedOrders,
  selectFeed,
  selectMyOrderModalData,
  selectMyOrderRequest,
  selectOrderError,
  selectOrderInfoModalData,
  selectCurrentNumber
} = orderSlice.selectors;
export const {
  clearMyOrderModalData,
  clearOrderInfoModalData,
  setCurrentNumberPage
} = orderSlice.actions;
