/**
 *
 * RoomItem
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AssignBox from './AssignBox';
import HKBox from './HKBox';
import Title from './Title';
import Footer from './Footer';

// import styled from 'styled-components';

function RoomItem({
  item,
  isAssignment,
  isHousekeeping,
  clickAction,
}) {
  // useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined

  // hk : housekeeping
  // assign: assignment
  const [roomProperties, setRoomProperties] = useState({
    assignKey : 0,
    assignArray: ['Not assigned', 'Check in', 'Check out', 'Service', 'Full service', 'Check out / in'],
    hkKey: 0,
    hkArray: ['Not taken', 'Taken', 'Done', 'Occupied'],
    washDoona: false,
    washCurtain: false,
    washMattressProtector: false,
  });

  useEffect(() => {
    // loading on
    if(isHousekeeping){
      setRoomProperties({...roomProperties, assignKey : item.assignKey})
    }
 },['assignKey']);
  // Reading State
  {/* <p>You clicked {count} times</p> */}
  // Seting State
  {/* <button onClick={() => setCount(count + 1)}></button> */}
  const roomClickAction = () => {
    let nextKey = 0;
    if(isAssignment){
      nextKey = roomProperties.assignKey + 1;
      if(nextKey > (roomProperties.assignArray.length-1)){
        nextKey = 0;
      }
      setRoomProperties({...roomProperties, assignKey: nextKey});
      clickAction({
        room: item._id,
        _id: item._id,
        assignKey: nextKey,
        service: roomProperties.assignArray[nextKey],
        type: 'room'
      });
    }
  }


  if (isAssignment == true) {
    return (
      <AssignBox
        assignKey={roomProperties.assignKey}
        onClick={roomClickAction}
      >
      <Title>{item.name}</Title>
      <Footer>{roomProperties.assignArray[roomProperties.assignKey]}</Footer>
      </AssignBox>
    );
  }

  if( isHousekeeping == true ){
    console.log('RoomItem', item);
    return (
      <HKBox
        hkKey={roomProperties.hkKey}
        assignKey={roomProperties.assignKey}
        onClick={roomClickAction}
      >
      <Title>{item.room.zone} - {item.room.name}</Title>
      <Footer>{roomProperties.hkArray[roomProperties.hkKey]}</Footer>
      </HKBox>
    );
  }

}

RoomItem.propTypes = {};

export default RoomItem;
