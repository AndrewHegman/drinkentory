import React from "react";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { Redirect, RouteProps, Route } from "react-router";
import { RootState } from "../../Redux/Store/index";
import { selectors } from "../../Redux";

interface IPrivateRouteProps extends PropsFromRedux, RouteProps {
  isAllowed?: () => boolean;
  redirectRoute?: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: selectors.users.isLoggedIn(state),
  };
};

export const PrivateRouteComponent: React.FC<IPrivateRouteProps> = (props) => {
  const { isAllowed, redirectRoute, isLoggedIn, children, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if ((isAllowed && isAllowed()) || isLoggedIn) {
          // if (true) {
          return render && render(props);
        }
        return <Redirect to={"/login"} />;
      }}
    />
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const PrivateRoute = connector(PrivateRouteComponent);
