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
import { loadAssignment } from '../App/actions';
import { setItemToUpdate } from '../HomePage/actions';
import {
  makeSelectAssignment,
} from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import AssignmentList from '../../components/AssignmentList';
import TaskList from '../../components/TaskList';
import Title from '../../components/Title';


export function HomePage({
  getAssignment,
  updateItemStatus,
  assignment }) {

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

      <Title>
        <h1>Housekeeping</h1>
        <div><input type="date" defaultValue={moment().format('YYYY-MM-DD')}/></div>
      </Title>
      <section>
        <h2>Tasks</h2>
        <TaskList
          items={assignment.tasks}
          clickAction = {itemClickAction}
          isHousekeeping={true}
        />
        <AssignmentList
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
    updateItemStatus: item => dispatch(setItemToUpdate(item))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
