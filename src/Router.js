import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import { PRODUCTS_OF_CATEGORY } from 'constants/pathnames';

import { App } from 'components/App';

export const Router = () => (
  <Switch>
    <Route path="/" component={App} />
  </Switch>
);
