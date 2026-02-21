import { describe, test, expect } from '@jest/globals';
import { ingredientsSlice, initialState } from './slice';
import { getAll } from './actions';
import { TIngredient } from '@utils-types';

const ingredientsReducer = ingredientsSlice.reducer;

describe('ingredientsSlice асинхронные экшены (по ТЗ)', () => {
    const ingredients: TIngredient[] = [
        {
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
        },
        {
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
        },
        {
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
            image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        }
    ];

    test('getAll.pending устанавливает loading = true', () => {
        const action = { type: getAll.pending.type };
        const state = ingredientsReducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    test('getAll.fulfilled записывает данные и loading = false', () => {
        const action = { type: getAll.fulfilled.type, payload: ingredients };
        const state = ingredientsReducer(initialState, action);

        expect(state.ingredients).toEqual(ingredients);
        expect(state.buns).toEqual([ingredients[0]]);
        expect(state.mains).toEqual([ingredients[1]]);
        expect(state.sauces).toEqual([ingredients[2]]);
        expect(state.loading).toBe(false); 
        expect(state.error).toBeNull(); 
    });

    test('getAll.rejected записывает ошибку и loading = false', () => {
        const action = {
            type: getAll.rejected.type,
            error: { message: 'текст ошибки' }
        };
        const state = ingredientsReducer(initialState, action);

        expect(state.loading).toBe(false); 
        expect(state.error).toBe('текст ошибки'); 
    });
});
