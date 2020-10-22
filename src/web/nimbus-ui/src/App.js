import React from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";

import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';

import Container from '@material-ui/core/Container';

import { AppPage } from './Style';

function App() {
  const classes = AppPage();

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <BrowserRouter basename="/#">
          <Switch>
            <Route path="/" exact render={props => (<HomePage {...props} />)} />
            <Route path="/projects" exact render={props => (<ProjectsPage {...props} />)} />
            {/* <PrivateRoute path="/logout" exact  />
            <PrivateRoute path="/profile" exact render={props => (<ProfilePage {...props} setLoginInfo={setLoginInfo} />)} />
            <PrivateRoute path="/welcome" exact component={WelcomePage} />
            <PrivateRoute path="/settings" exact component={SettingsPage} />
            <PrivateRoute path="/billing" exact component={BillingPage} />
            <PrivateRoute path="/logins" exact component={LoginsPage} />
            <PrivateRoute path="/blank" exact component={BlankPage} />
            <Route path="/selectaccount" exact render={props => (<SelectAccountPage {...props} />)} /> */}
          </Switch>
        </BrowserRouter>

      </Container>
    </>
  );
}

export default App;
