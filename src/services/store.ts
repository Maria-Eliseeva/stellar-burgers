import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { orderSlice } from './order/slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  userSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
