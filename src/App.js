import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PAGE_TITLE } from './config/constants';
import { ROUTES } from './config/routes';
import CoronaGames from "./CoronaGames";
import LobbyPage from "./lobby";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <>
    <HelmetProvider>
      <Helmet titleTemplate={PAGE_TITLE} defaultTitle={PAGE_TITLE} />
    </HelmetProvider>
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={CoronaGames} />
        <Route exact path={ROUTES.LOBBY} component={LobbyPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      </Switch>
    </Router>
    </>
  );
};

export default App;
