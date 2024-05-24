import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as auth from "./redux/AuthRedux";
import { Navigate, Route, Routes } from "react-router-dom";

export function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.actions.logout());
    document.location.reload();
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path='*'
        element={<Navigate to='/auth/login' />}
      />
    </Routes>
  );
}
