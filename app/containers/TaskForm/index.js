/**
 *
 * TaskForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';

export function TaskForm({ onSubmitForm }) {
  const [task, setTask] = useState('');

  const changeHandler = event => {
    setTask(event.target.value);
  };

  const submitHandler = evt => {
    evt.preventDefault();
    if (task) {
      onSubmitForm(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        placeholder="Enter new task"
        name="task"
        value={task}
        onChange={changeHandler}
      />
      <Button disabled={task === '' ? 'disabled' : ''} type="submit">
        Create task
      </Button>
    </form>
  );
}

TaskForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default TaskForm;
