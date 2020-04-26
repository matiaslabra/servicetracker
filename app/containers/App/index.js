/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Notify } from 'react-redux-notify';
import Header from 'components/Header';
import HomePage from '../HomePage/Loadable';
import AdminPage from '../AdminPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

// notify styles
import 'react-redux-notify/dist/ReactReduxNotify.css';
import GlobalStyle from '../../global-styles';

import FlexContainer from './FlexContainer';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FlexContainer>
        <Notify />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </FlexContainer>
    </ThemeProvider>
  );
}
