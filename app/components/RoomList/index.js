/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

import RoomListItem from 'containers/RoomListItem';
import CardListItem from 'containers/CardListItem';


function RoomList({
  items,
  action,
  isAssignment,
  isHousekeeping,
  hasMultipleSet
}) {

  let sectionContent = <div />;

  if(items.length > 0){
    sectionContent = items.map((item , index) => {
      return (
        <React.Fragment key = {'framgmentkey' + index }>
          <List
            key = {'keylist' + index }
            component={ isAssignment ? RoomListItem : CardListItem}
            data = { item }
            clickAction = { action }
            isAssignment={ isAssignment ? isAssignment : false }
            isHousekeeping={ isHousekeeping ? isHousekeeping : false }
            hasMultipleSet={ hasMultipleSet ? hasMultipleSet : false }
          />
        </React.Fragment>
      );
    })
  }else{
    sectionContent = <List component={RoomListItem} data={[]}/>
  }

  return (
      <section>
        {sectionContent}
      </section>
  )
}

RoomList.propTypes = {
  items: PropTypes.array,
  action: PropTypes.func,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
  hasMultipleSet: PropTypes.bool
};

export default RoomList;
