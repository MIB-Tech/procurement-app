import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../_custom/hooks/UseAuth";

const AuthGuard = () => {
  const { user } = useAuth();

  // If has token, return outlet in other case return navigate to login page

  return user.hasPasswordChanged !== null ? (
    <Outlet />
  ) : (
    <Navigate to='/settings' />
  );
};

export default AuthGuard;
