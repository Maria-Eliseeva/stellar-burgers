import { createSlice } from '@reduxjs/toolkit';
import { getAll } from './actions';
import { TIngredient } from '@utils-types';
type IngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: IngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setBuns: (state, action) => {
      state.buns = action.payload;
    },
    setMains: (state, action) => {
      state.mains = action.payload;
    },
    setSauses: (state, action) => {
      state.sauces = action.payload;
    }
  },
  selectors: {
    selectBuns: (state) => state.buns,
    selectAllIngredients: (state) => state.ingredients,
    selectMains: (state) => state.mains,
    selectSauses: (state) => state.sauces,
    selectIngredientById: (state) => (id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        const ingredients = action.payload;
        state.ingredients = ingredients;
        state.buns = ingredients.filter(
          (ingredient) => ingredient.type === 'bun'
        );
        state.mains = ingredients.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauces = ingredients.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ingredients rejected';
      });
  }
});
export const {
  selectBuns,
  selectMains,
  selectSauses,
  selectIngredientById,
  selectAllIngredients
} = ingredientsSlice.selectors;
export const { setBuns, setMains, setSauses } = ingredientsSlice.actions;
