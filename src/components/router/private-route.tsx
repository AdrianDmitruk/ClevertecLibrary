import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectRegistrationData } from '../../redux/auth/selectors';

export const PrivateRoute: FC = () => {
  const { data } = useSelector(selectRegistrationData);
  const isAuth = !!data?.jwt;

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};
