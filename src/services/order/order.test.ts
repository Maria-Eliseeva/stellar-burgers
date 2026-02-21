import { describe, test, expect } from '@jest/globals';
import { orderSlice, initialState } from './slice';
import {
  createOrder,
  getOrders,
  getFeeds,
  getOrderByNumber
} from './actions';
import { TOrder, TOrdersData } from '../../utils/types';

const orderReducer = orderSlice.reducer;

describe('orderSlice асинхронные экшены', () => {
  const order: TOrder = {
    _id: '1',
    ingredients: ['ing1', 'ing2'],
    status: 'status',
    name: 'Тестовый заказ',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01',
    number: 12345
  };

  const feeds: TOrdersData = {
    orders: [order],
    total: 100,
    totalToday: 10
  };

  describe('createOrder', () => {
    test('createOrder.pending устанавливает флаги загрузки', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.myOrderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('createOrder.fulfilled записывает данные заказа и сбрасывает флаги', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.myOrderRequest).toBe(false);
      expect(state.myOrderModalData).toEqual(order);
      expect(state.error).toBeNull();
    });

    test('createOrder.rejected записывает ошибку и сбрасывает флаги', () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: 'текст ошибки' }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.myOrderRequest).toBe(false);
      expect(state.error).toBe('текст ошибки');
    });
  });

  describe('getOrders', () => {
    test('getOrders.fulfilled записывает заказы пользователя и сбрасывает isLoading', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: [order]
      };
      const state = orderReducer(initialState, action);

      expect(state.userOrders).toEqual([order]);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('getOrders.rejected записывает ошибку и сбрасывает isLoading', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'текст ошибки' }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('текст ошибки');
    });
  });

  describe('getFeeds', () => {
    test('getFeeds.pending устанавливает isLoading и сбрасывает ошибку', () => {
      const action = { type: getFeeds.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('getFeeds.fulfilled записывает ленту заказов и сбрасывает isLoading', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: feeds
      };
      const state = orderReducer(initialState, action);

      expect(state.feed).toEqual(feeds);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('getFeeds.rejected записывает ошибку и сбрасывает isLoading', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: 'текст ошибки' }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('текст ошибки');
    });
  });

  describe('getOrderByNumber', () => {
    test('getOrderByNumber.fulfilled записывает данные заказа и сбрасывает isLoading', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: [order]
      };
      const state = orderReducer(initialState, action);

      expect(state.orderInfoModalData).toEqual(order);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('getOrderByNumber.rejected записывает ошибку и сбрасывает isLoading', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'текст ошибки' }
      };
      const state = orderReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('текст ошибки');
    });
  });
});