import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserOrders } from '../../services/order/slice';
import { getOrders } from '../../services/order/actions';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  return <ProfileOrdersUI orders={orders} />;
};
