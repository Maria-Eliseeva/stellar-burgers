import { describe, test, expect } from '@jest/globals';
import { userSlice, initialState } from './slice';
import { login, register, logout, updateUser } from './actions';
import { TUser } from '../../utils/types';

const userReducer = userSlice.reducer;

describe('userSlice асинхронные экшены', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  describe('login', () => {
    test('login.pending устанавливает isLoading = true', () => {
      const action = { type: login.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    test('login.fulfilled записывает пользователя и обновляет флаги', () => {
      const action = { type: login.fulfilled.type, payload: user };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(user);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    test('login.rejected записывает ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: login.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('register', () => {
    test('register.pending устанавливает isLoading = true', () => {
      const action = { type: register.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    test('register.fulfilled записывает пользователя и обновляет флаги', () => {
      const action = { type: register.fulfilled.type, payload: user };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(user);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    test('register.rejected записывает ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Register failed';
      const action = {
        type: register.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    test('logout.pending устанавливает isLoading = true', () => {
      const action = { type: logout.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    test('logout.fulfilled сбрасывает пользователя и обновляет флаги', () => {
      const loggedInState = {
        ...initialState,
        user:user,
        isAuthChecked: true
      };
      const action = { type: logout.fulfilled.type };
      const state = userReducer(loggedInState, action);

      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    test('logout.rejected записывает ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Logout failed';
      const action = {
        type: logout.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('updateUser', () => {
    test('updateUser.pending устанавливает isLoading = true', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    test('updateUser.fulfilled обновляет пользователя и флаги', () => {
      const updatedUser: TUser = {
        email: 'updated@example.com',
        name: 'Updated User'
      };
      const action = { type: updateUser.fulfilled.type, payload: updatedUser };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(updatedUser);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    test('updateUser.rejected записывает ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});