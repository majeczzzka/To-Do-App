import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ path, children, ...rest }) {
  const isAuthenticated = true; // You can replace this with your authentication logic

  return (
    <Route
      path={path}
      element={isAuthenticated ? children : <Navigate to="/login" replace />}
      {...rest}
    />
  );
}

export default PrivateRoute;
