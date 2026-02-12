import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const getAll = createAsyncThunk('ingredients/getAll', getIngredientsApi);
