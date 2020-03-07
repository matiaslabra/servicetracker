/**
 *
 * ReportPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReportPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import H1 from '../../components/H1';
import Button from '../../components/Button';

export function ReportPage() {
  useInjectReducer({ key: 'reportPage', reducer });
  useInjectSaga({ key: 'reportPage', saga });

  const [roomsData, setRoomsData] = useState({
    rooms: [
      { id: 1, name: 'P1', lastDoonaWash: '2020-01-02', lastService: 'Full-Service', lastServiceDate: '2020-03-04' },
      { id: 2, name: 'P2', lastDoonaWash: '2020-01-02', lastService: 'Full-Service', lastServiceDate: '2020-03-04' },
      { id: 3, name: 'D2', lastDoonaWash: '2020-01-02', lastService: 'Full-Service', lastServiceDate: '2020-03-04' },
      { id: 4, name: 'C2', lastDoonaWash: '2020-01-02', lastService: 'Full-Service', lastServiceDate: '2020-03-04' }
   ]
  });

  // const tableHeaders =>
  return (
    <article>
      <Helmet>
        <title>AdminPage</title>
        <meta name="description" content="Report page room tracker" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <section>
        <H1>Room report</H1>
      </section>
      <section>
        <table>
          <thead></thead>
        </table>
      </section>
    </article>
  )
}

ReportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reportPage: makeSelectReportPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportPage);
