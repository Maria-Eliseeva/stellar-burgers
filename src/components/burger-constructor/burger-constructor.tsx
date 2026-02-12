import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { selectconstructorItems } from '../../services/burger-constructor/slice';
import { createOrder } from '../../services/order/actions';
import {
  selectMyOrderRequest,
  selectMyOrderModalData,
  clearMyOrderModalData
} from '../../services/order/slice';
import { selectUser } from '../../services/user/slice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectconstructorItems);
  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectMyOrderRequest);
  const orderModalData = useSelector(selectMyOrderModalData);

  const onOrderClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item: { _id: any }) => item._id)
    ];
    await dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearMyOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
