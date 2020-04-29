/**
 *
 * DateForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input/index';

function DateForm({ onChangeCallback, defaultValue }) {
  const [date, setDate] = useState(defaultValue);

  const handleDateChange = evt => {
    const newDate = evt.target.value;
    setDate(newDate);
    onChangeCallback(newDate);
  };

  return <Input type="date" onChange={handleDateChange} defaultValue={date} />;
}

DateForm.propTypes = {
  onChangeCallback: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default DateForm;
