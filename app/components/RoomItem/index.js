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
    _id: item._id,
    room: item._id, // mongoose assignment - room relation
    assignKey : item.assignment ? item.assignment.rooms.assignKey : 0,
    assignArray: ['Not assigned', 'Check out', 'Service', 'Full service', 'Check out / in'],
    hkKey: 0,
    hkArray: ['Not taken', 'Taken', 'Done', 'Occupied'],
    washDoona: item.assignment ? item.assignment.rooms.washDoona : false,
    washCurtain: item.assignment ? item.assignment.rooms.washCurtain : false,
    washMattressProtector: item.assignment ? item.assignment.rooms.washMattressProtector : false,
    type: 'rooms'
  });


  useEffect(() => {
    // loading on
    if(isHousekeeping){
      setRoomProperties({...roomProperties, assignKey : item.assignKey})
    }
 },[roomProperties.assignKey]);

  //Expose specifics functions to ref
  useImperativeHandle(ref, () => {
    return {
      roomClickAction: roomClickAction
    }
 });
  const roomWashPropertiesClick = (propertie) => {
    if(roomProperties.assignKey != 0){
      setRoomProperties({...roomProperties, [propertie]: !roomProperties[propertie]});
      clickAction({ ...roomProperties, [propertie]: !roomProperties[propertie]
      });
    }
  }

  const roomClickAction = (status) => {

    let nextKey = 0;
    let options = {};
    if(isAssignment){
      // Number.isInteger necesary since status refer to a class to work with useImperativeHandle when
      // read from inside
      nextKey = Number.isInteger(status) ? status : (roomProperties.assignKey + 1);
      if(nextKey > (roomProperties.assignArray.length-1)){
        nextKey = 0;
      }
      if(nextKey == 0){
        options = {
          washDoona: false,
          washCurtain: false,
          washMattressProtector: false
        }
      }
      setRoomProperties({...roomProperties, assignKey: nextKey , ...options});
      clickAction({...roomProperties, assignKey: nextKey, service: roomProperties.assignArray[nextKey]});
    }
  }

  return (
    <Box
      assignKey={roomProperties.assignKey}
    >
    <ButtonsWrapper>
      <Button status={roomProperties.washDoona} onClick={() => {roomWashPropertiesClick('washDoona')}}>D</Button>
      <Button status={roomProperties.washCurtain} onClick={() => {roomWashPropertiesClick('washCurtain')}}>SC</Button>
      <Button status={roomProperties.washMattressProtector} onClick={() => {roomWashPropertiesClick('washMattressProtector')}}>MP</Button>
    </ButtonsWrapper>
    <Title onClick={roomClickAction}>{item.name}</Title>
    <Footer>{roomProperties.assignArray[roomProperties.assignKey]}</Footer>
    </Box>
  );
});

RoomItem.propTypes = {};

export default RoomItem;
