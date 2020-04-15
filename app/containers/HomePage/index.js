/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectAssignment } from 'containers/App/selectors';
import { makeSelectDate } from 'containers/HomePage/selectors';
import { loadAssignment } from '../App/actions';
import { setItemToUpdate, changeDate } from './actions';

import reducer from './reducer';
import saga from './saga';

import TaskListWrapper from './TaskListWrapper';
import TaskList from '../../components/TaskList';
import RoomList from '../../components/RoomList';

import H1 from '../../components/H1';
import H2 from '../../components/H2';

export function HomePage({
  getAssignment,
  updateItemStatus,
  assignment,
  date,
  onChangeDate,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    // Sets initial date (today) to view triggering second useEffect
    onChangeDate(moment().format('YYYY-MM-DD'));
  }, []); // run code once

  useEffect(() => {
    // gets Assignment from API
    getAssignment();
  }, [date]); // run code when date from props changes

  return (
    <article>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>

      <section>
        <H1>
          Assignment <small>{moment(date).format('dddd, MMMM Do YYYY')} </small>
        </H1>
        <div>
          <input
            type="date"
            onChange={onChangeDate}
            defaultValue={moment().format('YYYY-MM-DD')}
          />
        </div>
      </section>
      <section>
        <H2>Tasks</H2>
        <TaskListWrapper>
          <TaskList
            items={assignment.tasks}
            clickAction={updateItemStatus}
            isHousekeeping
          />
        </TaskListWrapper>
        <H2>Rooms</H2>
        <RoomList
          items={assignment.rooms}
          isHousekeeping
          action={updateItemStatus}
        />
      </section>
    </article>
  );
}

HomePage.propTypes = {
  assignment: PropTypes.object,
  getAssignment: PropTypes.func,
  updateItemStatus: PropTypes.func,
  onChangeDate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assignment: makeSelectAssignment(),
  date: makeSelectDate(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssignment: () => dispatch(loadAssignment()),
    updateItemStatus: item => dispatch(setItemToUpdate(item)),
    onChangeDate: evt => {
      if (evt.target !== undefined) {
        dispatch(changeDate(evt.target.value));
      } else {
        dispatch(changeDate(evt));
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
