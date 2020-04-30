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
import { makeSelectAssignment, makeSelectLoading } from '../../App/selectors';
import { loadAssignment } from '../../App/actions';
import { makeSelectDate } from './selectors';
import { setItemToUpdate, changeDate } from './actions';

import reducer from './reducer';
import saga from './saga';

import TaskListWrapper from './TaskListWrapper';

import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import RoomZones from '../../../components/RoomZones';
import HomeRoomList from '../HomeRoomList';
import HomeTaskList from '../HomeTaskList';
import DateForm from '../../DateForm';

export function HomePage({
  getAssignment,
  updateItemStatus,
  assignment,
  date,
  handleDateChange,
  isLoading,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

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

      <H1>
        {moment(date).format('dddd, MMMM Do YYYY')}
        <DateForm onChangeCallback={handleDateChange} defaultValue={date} />
      </H1>
      <section>
        <H2>Tasks</H2>
        <TaskListWrapper>
          <HomeTaskList
            items={assignment.tasks}
            parentAction={updateItemStatus}
            date={assignment.date}
            isHousekeeping
            loading={isLoading}
          />
        </TaskListWrapper>
        <H2>Rooms</H2>
        <RoomZones
          component={HomeRoomList}
          zones={assignment.rooms}
          parentAction={updateItemStatus}
          date={assignment.date}
          isHousekeeping
          loading={isLoading}
        />
      </section>
    </article>
  );
}

HomePage.propTypes = {
  assignment: PropTypes.object,
  getAssignment: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  updateItemStatus: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  date: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  assignment: makeSelectAssignment(),
  date: makeSelectDate(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssignment: () => dispatch(loadAssignment()),
    updateItemStatus: item => dispatch(setItemToUpdate(item)),
    handleDateChange: date => dispatch(changeDate(date)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
