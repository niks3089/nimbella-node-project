import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";

import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';

import Container from '@material-ui/core/Container';

import { AppPage } from './Style';

function App() {
  const classes = AppPage();
  const [loginInfo, setLoginInfo] = useState();

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <BrowserRouter basename="/#">
          <Switch>
            <Route path="/" exact render={props => (<HomePage {...props} setLoginInfoFunction={setLoginInfo} loginDetails={loginInfo} />)} />
            <Route path="/projects" exact render={props => (<ProjectsPage {...props} loginDetails={loginInfo} />)} />
          </Switch>
        </BrowserRouter>

      </Container>
    </>
  );
}

export default App;
