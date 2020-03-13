/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';

import RoomListItem from 'containers/RoomListItem';
import H2 from 'components/H2';

function RoomList({
  component,
  items,
  action,
  isAssignment,
  isHousekeeping,
  hasMultipleSet
}) {

  const ComponentToRender = component;
  let sectionContent = <div />;
  let itemArray = items;

  if(Object.keys(itemArray).length > 0){
    sectionContent = itemArray.map((item , index) => {
      return (
        <React.Fragment key = {'framgmentkey' + index }>
          <List
            key = {'keylist' + index }
            component={ RoomListItem }
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