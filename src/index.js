import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { SnackbarProvider } from "notistack";
import { Store } from './redux/Store';
import history from './history';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Spinner from './ui/Spinner';

ReactDOM.render(
  <Provider store={Store}>
    <Suspense fallback={<Spinner />}>
      <SnackbarProvider maxSnack={10}>
        <Router history={history}>
          <Switch>
            <Route path="/:cfgname" component={Dashboard} />
            <Redirect to="/start" />
          </Switch>
        </Router>
      </SnackbarProvider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
