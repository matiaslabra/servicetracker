/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import RoomListItem from 'containers/RoomListItem';
import CardListItem from 'containers/CardListItem';
import List from '../List';

function RoomList({
  items,
  action,
  isAssignment,
  isHousekeeping,
  hasMultipleSet,
}) {
  let sectionContent = <div />;

  if (items.length > 0) {
    sectionContent = items.map((item, index) => (
      <React.Fragment key={`framgmentkey${index}`}>
        <List
          key={`keylist${index}`}
          component={isAssignment ? RoomListItem : CardListItem}
          data={item}
          clickAction={action}
          isAssignment={isAssignment || false}
          isHousekeeping={isHousekeeping || false}
          hasMultipleSet={hasMultipleSet || false}
        />
      </React.Fragment>
    ));
  } else {
    sectionContent = <List component={RoomListItem} data={[]} />;
  }

  return <section>{sectionContent}</section>;
}

RoomList.propTypes = {
  items: PropTypes.array,
  action: PropTypes.func,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
  hasMultipleSet: PropTypes.bool,
};

export default RoomList;
