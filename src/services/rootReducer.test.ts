import { rootReducer } from './store';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { userSlice } from './user/slice';
import { orderSlice } from './order/slice';

describe('rootReducer инициализация', () => {
  it('с неизвестными состоянием и экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual({
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [orderSlice.name]: orderSlice.getInitialState()
    });
  });
});
