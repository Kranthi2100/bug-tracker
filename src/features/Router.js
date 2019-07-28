import React from 'react';
import { HashRouter as AppRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import IssueView from './issue-view/IssueView';

const Router = () => (
  <AppRouter>
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/ticket/new" component={IssueView} />
      <Route path="/ticket/:ticketId" component={IssueView} />
    </Switch>
  </AppRouter>
);

export default Router;
