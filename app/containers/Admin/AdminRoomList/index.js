/**
 *
 * Section
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import AdminRoomItem from '../../../components/AdminRoomItem';
// import CardListItem from 'containers/CardListItem';
import List from '../../../components/List';
import Button from '../../../components/Button';

function AdminRoomList({
  items,
  orientation,
  parentAction,
  isAssignment,
  isHousekeeping,
}) {
  const assignItem = {
    assignKey: 0,
    assignArray: [
      'Not assigned',
      'Check out',
      'Service',
      'Full service',
      'Check out / in',
    ],
    washDoona: false,
    washCurtain: false,
    washMattressProtector: false,
    type: 'rooms',
  };

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    const roomItems = items.reduce((ac, item) => {
      let newRoomItem;
      newRoomItem = { ...assignItem, ...item };
      if ('assignment' in item) {
        newRoomItem = {
          ...newRoomItem,
          ...item.assignment.rooms,
        };
      }
      ac.push(newRoomItem);
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
    nextKey = roomList[roomIndex].assignKey + 1;
    if (nextKey > roomList[roomIndex].assignArray.length - 1) {
      nextKey = 0;
    }
    let options = {};
    if (nextKey === 0) {
      options = {
        washDoona: false,
        washCurtain: false,
        washMattressProtector: false,
      };
    }
    const newRoomList = [...roomList];
    newRoomList[roomIndex] = {
      ...roomList[roomIndex],
      assignKey: nextKey,
      ...options,
    };
    setRoomList(newRoomList);
    parentAction([newRoomList[roomIndex]]);
  };

  // eslint-disable-next-line consistent-return
  const secondClickAction = (_id, property) => {
    const roomIndex = findRoomKeyById(_id);
    if (roomList[roomIndex].assignKey === 0) return false;
    const newRoomList = [...roomList];
    newRoomList[roomIndex] = {
      ...roomList[roomIndex],
      [property]: !roomList[roomIndex][property],
    };
    // console.log(newRoomList[roomIndex]);
    setRoomList(newRoomList);
    parentAction([newRoomList[roomIndex]]);
  };

  const stateToSection = event => {
    const stateKey = parseInt(event.target.dataset.state, 10);
    const newItems = roomList.map(item => ({
      ...item,
      assignKey: stateKey,
    }));
    setRoomList(newItems);
    parentAction(newItems);
  };

  return (
    <section>
      <div>
        <Button data-state="1" onClick={stateToSection}>
          All Check out
        </Button>
        <Button data-state="2" onClick={stateToSection}>
          All Service
        </Button>
        <Button data-state="3" onClick={stateToSection}>
          All Full Service
        </Button>
        <Button data-state="0" onClick={stateToSection}>
          Reset
        </Button>
      </div>
      <List
        component={AdminRoomItem}
        items={roomList}
        orientation={orientation}
        clickAction={mainClickAction}
        secClickAction={secondClickAction}
        isAssignment={isAssignment || false}
        isHousekeeping={isHousekeeping || false}
      />
    </section>
  );
}

AdminRoomList.propTypes = {
  items: PropTypes.array.isRequired,
  parentAction: PropTypes.func.isRequired,
  isAssignment: PropTypes.bool.isRequired,
  isHousekeeping: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
};

export default AdminRoomList;
