/**
 *
 * Asynchronously loads the component for RoomItem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
