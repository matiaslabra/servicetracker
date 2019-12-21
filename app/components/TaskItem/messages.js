/*
 * TaskItem Messages
 *
 * This contains all the text for the TaskItem component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TaskItem';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TaskItem component!',
  },
});
