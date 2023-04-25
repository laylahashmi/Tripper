// AuthenticatedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ path, element: Element, isAuthenticated, ...rest }) => (
  isAuthenticated ? (
    <Route path={path} element={<Element {...rest} />} />
  ) : (
    <Navigate to="/login" replace />
  )
);

export default AuthenticatedRoute;

