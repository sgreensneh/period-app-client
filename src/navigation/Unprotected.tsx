import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from "../redux/hooks";

function Unprotected() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/"/>
  }

  return (
    <Outlet/>
  );
}

export default Unprotected;
