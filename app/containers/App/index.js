/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import AdminPage from 'containers/AdminPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';
import GlobalStyle from '../../global-styles';
// notify styles
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { Notify } from 'react-redux-notify';
import history from 'utils/history';




const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

`;
export default function App() {

  const [open, setOpen] = useState(false);

  history.listen( location =>  {
    //Do your stuff here
    if(open){
      setOpen(false);
    }
  });

  return (
    <AppWrapper>
      <Notify />
      <Header open={open} setOpen={setOpen}  />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
