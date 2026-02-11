import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun')
          state.constructorItems.bun = action.payload;
        else state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, uniqueId: uuidv4() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') state.constructorItems.bun = null;
      else {
        const index = state.constructorItems.ingredients.findIndex(
          (item: TConstructorIngredient) =>
            item.uniqueId === action.payload.uniqueId
        );
        if (index !== -1) {
          state.constructorItems.ingredients.splice(index, 1);
        }
      }
    },
    moveUp: (state, action) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item: TConstructorIngredient) =>
          item.uniqueId === action.payload.uniqueId
      );
      if (index !== -1) {
        const upperElement = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index] = upperElement;
        state.constructorItems.ingredients[index - 1] = action.payload;
      }
    },
    moveDown: (state, action) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item: TConstructorIngredient) =>
          item.uniqueId === action.payload.uniqueId
      );
      if (index !== -1) {
        const upperElement = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index] = upperElement;
        state.constructorItems.ingredients[index + 1] = action.payload;
      }
    }
  },
  selectors: {
    selectconstructorItems: (state) => state.constructorItems
  }
});
export const { selectconstructorItems } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  clearIngredient,
  moveUp,
  moveDown
} = burgerConstructorSlice.actions;
