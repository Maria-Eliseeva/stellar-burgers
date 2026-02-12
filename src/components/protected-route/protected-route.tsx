import React from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedProps = {
  requireAuth?: boolean;
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const Protected = ({
  requireAuth = false,
  onlyUnAuth = false,
  component
}: ProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/' />;
  }

  return component;
};
