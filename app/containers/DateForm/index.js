/**
 *
 * DateForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Input from '../../components/Input/index';

export function DateForm({ onChangeCallback, defaultValue }) {
  const [date, setDate] = useState(defaultValue);

  const onChangeDate = evt => {
    const newDate = evt.target.value;
    setDate(newDate);
    onChangeCallback(newDate);
  };

  return <Input type="date" onChange={onChangeDate} defaultValue={date} />;
}

DateForm.propTypes = {
  onChangeCallback: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(DateForm);
