/**
 *
 * RoomItem
 *
 */

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import Title from './Title';
import Footer from './Footer';
import ButtonsWrapper from './ButtonsWrapper';
import Button from './Button';

// import styled from 'styled-components';

const RoomItem = forwardRef(({
  item,
  isAssignment,
  isHousekeeping,
  clickAction,
}, ref) => {
  // useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined

  // hk : housekeeping
  // assign: assignment
  const [roomProperties, setRoomProperties] = useState({
    assignKey : 0,
    assignArray: ['Not assigned', 'Check out', 'Service', 'Full service', 'Check out / in'],
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

  //Expose specifics functions to ref
  useImperativeHandle(ref, () => {
    return {
      roomClickAction: roomClickAction
    }
 });

  const roomClickAction = (status) => {
    let nextKey = 0;

    if(isAssignment){
      nextKey = Number.isInteger(status)? status : (roomProperties.assignKey + 1);
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

  return (
    <Box
      assignKey={roomProperties.assignKey}

    >
    <ButtonsWrapper>
      <Button status={roomProperties.washDoona} onClick={() => {setRoomProperties({...roomProperties, washDoona: !roomProperties.washDoona})}}>D</Button>
      <Button status={roomProperties.washCurtain} onClick={() => {setRoomProperties({...roomProperties, washCurtain: !roomProperties.washCurtain})}}>C</Button>
      <Button status={roomProperties.washMattressProtector} onClick={() => {setRoomProperties({...roomProperties, washMattressProtector: !roomProperties.washMattressProtector})}}>MP</Button>
    </ButtonsWrapper>
    <Title onClick={roomClickAction}>{item.name}</Title>
    <Footer>{roomProperties.assignArray[roomProperties.assignKey]}</Footer>
    </Box>
  );
});

RoomItem.propTypes = {};

export default RoomItem;
