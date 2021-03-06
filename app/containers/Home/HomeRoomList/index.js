/**
 *
 * Section
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../../../components/List';
import HomeRoomItem from '../../../components/HomeRoomItem';

const hkItem = {
  hkArray: ['Not taken', 'In progress', 'Done'],
  assignArray: [
    'Not assigned',
    'Check out',
    'Service',
    'Full service',
    'Check out / in',
  ],
  type: 'rooms',
};

function HomeRoomList({
  items,
  date,
  orientation,
  parentAction,
  isHousekeeping,
}) {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const roomItems = items.reduce((ac, item) => {
      ac.push({ ...hkItem, ...item });
      return ac;
    }, []);

    setRoomList(roomItems);
  }, [items]);

  const findRoomKeyById = useCallback(
    _id => roomList.findIndex(item => item._id === _id),
    [roomList],
  );

  const mainClickAction = _id => {
    const roomIndex = findRoomKeyById(_id);
    let nextKey = 0;
    nextKey = roomList[roomIndex].hkKey + 1;
    if (nextKey > roomList[roomIndex].hkArray.length - 1) {
      nextKey = 0;
    }
    const newRoomList = [...roomList];
    newRoomList[roomIndex] = {
      ...roomList[roomIndex],
      hkKey: nextKey,
    };
    setRoomList(newRoomList);
    parentAction({ ...newRoomList[roomIndex], date });
  };

  return (
    <section>
      <List
        component={HomeRoomItem}
        items={roomList}
        orientation={orientation}
        clickAction={mainClickAction}
        isHousekeeping={isHousekeeping}
      />
    </section>
  );
}

HomeRoomList.propTypes = {
  items: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  parentAction: PropTypes.func.isRequired,
  isHousekeeping: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
};

export default HomeRoomList;
