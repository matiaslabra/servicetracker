/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import AdminPage from 'containers/AdminPage/Loadable';
import ReportPage from 'containers/ReportPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';
import GlobalStyle from '../../global-styles';
import Wrapper from './Wrapper';
// notify styles
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { Notify } from 'react-redux-notify';
import history from 'utils/history';

export default function App() {
  const [open, setOpen] = useState(false);
  // useInjectSaga({ key: 'app', saga });
  history.listen(() => {
    // Close mobile Navbar when history.listen detect any change
    if (open) {
      setOpen(false);
    }
  });

  return (
    <Wrapper>
      <Notify />
      <Header open={open} setOpen={setOpen} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        {/* <Route path="/report" component={ReportPage} /> */}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Wrapper>
  );
}
