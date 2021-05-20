import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import OrderPage from "./pages/Order";
import MenuPage from "./pages/Menu";
import OTP from "./pages/OTP";
import { selectIsLoggedIn } from "./features/user/userSlice";
import { useSelector } from "react-redux";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import "./App.css";

function App() {
  const ref = useRef(null);
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/otp">
            <OTP />
          </Route>
          <PrivateRoute path="/menu/:restId">
            <MenuPage />
          </PrivateRoute>
          <PrivateRoute path="/order">
            <OrderPage />
          </PrivateRoute>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
        <NotificationContainer ref={ref} />
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
