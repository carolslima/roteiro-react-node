import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import Roteiro from "../pages/Roteiro";
import ImportFile from "../pages/ImportFile";
import Checklist from "../pages/Checklist";
import Paralela from "../pages/Paralela";
import Users from "../pages/Users";
import Providers from "../pages/Providers";
import Print from "../pages/Print";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} isPrivate />


      <Route path="/roteiro" component={Roteiro} isPrivate />

      <Route path="/users" component={Users} isPrivate />
      <Route path="/providers" component={Providers} isPrivate />

      <Route path="/import" component={ImportFile} isPrivate />
      <Route path="/checklist" component={Checklist} isPrivate />
      <Route path="/paralelas" component={Paralela} isPrivate />

      <Route path="/print/:year/:month/:day" component={Print} isPrivate />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
