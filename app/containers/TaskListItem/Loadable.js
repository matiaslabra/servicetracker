/**
 *
 * Asynchronously loads the component for TaskListItem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
