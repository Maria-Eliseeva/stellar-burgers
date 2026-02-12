import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectAllIngredients } from '../../services/ingredients/slice';
import {
  selectOrderInfoModalData,
  setCurrentNumberPage,
  clearOrderInfoModalData
} from '../../services/order/slice';
import { getOrderByNumber } from '../../services/order/actions';
export const OrderInfo: FC = () => {
  const { number } = useParams();
  const id = number;
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrderInfoModalData);
  const ingredients = useSelector(selectAllIngredients);
  useEffect(() => {
    if (id) {
      dispatch(getOrderByNumber(parseInt(id)));
      dispatch(setCurrentNumberPage(id));
      return () => {
        dispatch(clearOrderInfoModalData());
      };
    }
  }, []);
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
