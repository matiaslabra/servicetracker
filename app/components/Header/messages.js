/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  assignment: {
    id: `${scope}.assignment`,
    defaultMessage: 'Assignment',
  },
  report: {
    id: `${scope}.reports`,
    defaultMessage: 'Report',
  },
});
