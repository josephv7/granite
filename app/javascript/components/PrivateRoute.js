import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition()) {
    return <Redirect to={{
      pathname: redirectRoute,
      from: props.location,
    }} />;
  }
  return (
    <Route
      path={path}
      component={Component}
      {...props}
    />
  );
};

export default PrivateRoute;