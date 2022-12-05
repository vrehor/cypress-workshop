import { Route, Switch } from 'react-router';

import { Board, Home, Login, NotFound, Signup } from './pages';

export const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/boards/:boardId" component={Board} exact />
      <Route path="/404" component={NotFound} exact />
    </Switch>
  );
};
