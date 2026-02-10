import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TIngredient } from '@utils-types';

type BurgerConstructorState = {
  constructorItems: any;
};

export const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    clearIngredient: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun')
        state.constructorItems.bun = action.payload;
      else state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') state.constructorItems.bun = null;
      else {
        const index = state.constructorItems.ingredients.findIndex(
          (item: TIngredient) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.constructorItems.ingredients.splice(index, 1);
        }
      }
    }
  },
  selectors: {
    selectconstructorItems: (state) => state.constructorItems
  }
});
export const { selectconstructorItems } = burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, clearIngredient } =
  burgerConstructorSlice.actions;
