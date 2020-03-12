/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadAssignment, changeDate } from '../App/actions';
import { setItemToUpdate } from '../HomePage/actions';
import {
  makeSelectAssignment,
} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Section from '../../components/Section';
import TaskList from '../../components/TaskList';

import H1 from '../../components/H1';
import H2 from '../../components/H2';


export function HomePage({
  getAssignment,
  updateItemStatus,
  assignment,
  onChangeDate
}) {

  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
     // loading on
     getAssignment();
  },['assignment']); //empty array at the end tells to run insede code once
  console.log('props assignment', assignment)

  const itemClickAction = (item) => {
    console.log('itemClickAction with:', item)
    updateItemStatus(item);
  }

  return (
    <article>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}

      <section>
        <H1>Assignment <small>{moment().format('dddd, MMMM Do YYYY')} </small></H1>
        <div><input type="date" onChange={onChangeDate} defaultValue={moment().format('YYYY-MM-DD')}/></div>
      </section>

      <section>
        <H2>Tasks</H2>
        <TaskList
          items={assignment.tasks}
          clickAction = {itemClickAction}
          isHousekeeping={true}
        />
        <Section
          roomsList= {assignment.rooms}
          isHousekeeping = {true}
          action = {itemClickAction}
        />
      </section>
    </article>
  );
}

HomePage.propTypes = {
  // rooms: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // homePage: makeSelectHomePage(),
    assignment: makeSelectAssignment(),
    // loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssignment: () => dispatch(loadAssignment()),
    updateItemStatus: item => dispatch(setItemToUpdate(item)),
    onChangeDate: evt => {
      if (evt.target !== undefined){
        dispatch(changeDate(evt.target.value))
      }else{
        dispatch(changeDate(evt));
      }
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
