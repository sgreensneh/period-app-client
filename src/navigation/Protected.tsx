import React from 'react';
import {useAppSelector} from "../redux/hooks";
import {Navigate, Outlet} from "react-router-dom";

function Protected() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login"/>
  }

  return (
    <Outlet/>
  );
}

export default Protected;
