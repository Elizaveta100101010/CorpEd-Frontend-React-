import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { LOGIN_ROUTE } from './routesUtil'
export const PrivateRoutes = () => {
    const { token } = useSelector((state) => state.user);
    return token ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
  };

export const PrivateAdminRoutes = () => {
    const { position } = useSelector((state) => state.user)
    return position==="admin" ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />
  };