import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import EmailConfirm from "../containers/account/email_confirm";
import ResetPasswordConfirm from "../containers/account/reset_password_confirm";
import ChangePassword from "../containers/account/change_password";
import Profile from "../containers/account/profile";
import SideBar from "../components/sidebar";

const AccountRoutes = () => {
  let { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route exact path={`${path}/email-confirmation/:uuid/:token`} component={EmailConfirm}/>
      <Route exact path={`${path}/reset-password-confirmation/:uuid/:token`} component={ResetPasswordConfirm}/>
      <SideBar>
        <Route exact path={`${path}/change-password`} component={ChangePassword}/>
        <Route exact path={`${path}/profile`} component={Profile}/>
      </SideBar>
      </Switch>
  )
};

export default AccountRoutes;