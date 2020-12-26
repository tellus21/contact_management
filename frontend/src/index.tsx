import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Companies from "./pages/companies/Companies"
import Contacts from "./pages/contacts/Contacts"
import Courses from "./pages/courses/Courses"
import Options from "./pages/options/Options"
import Users from "./pages/user/Users"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Contacts} exact />
          <Route path="/companies" component={Companies} exact />
          <Route path="/courses" component={Courses} exact />
          <Route path="/options" component={Options} exact />
          <Route path="/users" component={Users} exact />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
