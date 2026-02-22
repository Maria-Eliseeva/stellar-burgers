import { describe, test, expect } from '@jest/globals';
import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown
} from './slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const burgerConstructorReducer = burgerConstructorSlice.reducer;

describe('burgerConstructorSlice reducer', () => {
  const ingredientBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  const ingredientSouse: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };
  const ingredient1: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    uniqueId: 'id1'
  };
  const ingredient2: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    uniqueId: 'id2'
  };

  test('добавление булки', () => {
    const initialState = burgerConstructorSlice.getInitialState();
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(ingredientBun)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(0);
    expect(newState.constructorItems.bun).toEqual({
      ...ingredientBun,
      uniqueId: expect.any(String)
    });
  });

  test('добавление ингредиента(соус)', () => {
    const initialState = burgerConstructorSlice.getInitialState();
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(ingredientSouse)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.bun).toBe(null);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredientSouse,
      uniqueId: expect.any(String)
    });
  });

  test('удаление ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1]
      }
    };
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(ingredient1)
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  test('изменение порядка ингредиентов (moveUp)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = burgerConstructorReducer(
      initialState,
      moveUp(ingredient2)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  test('изменение порядка ингредиентов (moveDown)', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const newState = burgerConstructorReducer(
      initialState,
      moveDown(ingredient1)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });
});
