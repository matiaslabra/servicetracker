/**
 *
 * AssignmentList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import List from 'components/List';

import RoomItem from 'components/RoomItem';
import Card from 'components/Card';
import H2 from 'components/H2';

function AssignmentList({
  roomsList,
  action,
  isAssignment,
  isHousekeeping
}) {

  let roomsContent = <div />;

  if(roomsList.length > 0){
    let zoneObject = {};
    roomsList.map( item =>{
      if(!(item.zone in zoneObject)){
        zoneObject[item.zone] = {};
        zoneObject[item.zone].rooms = [];
        zoneObject[item.zone].name = item.zone; //temp
      }
      zoneObject[item.zone].rooms.push(item);
    });
    // console.log('zoneObject', zoneObject)
    roomsContent = Object.entries(zoneObject).map(([key, value]) => {
      return (
        <div key={value.name + key}>
          <h3>{value.name}</h3>
          <List
            component={ isAssignment ? RoomItem : Card}
            items={ value.rooms }
            zone={ value.name }
            clickAction = { action }
            isAssignment={ isAssignment ? isAssignment : false }
            isHousekeeping={ isHousekeeping ? isHousekeeping : false }
          />
        </div>
      );
    })
  }else{
    roomsContent = <List component={RoomItem} items={roomsList}/>
  }

  return (
      <section>
        <H2>Rooms</H2>
        {roomsContent}
      </section>
  )
}

AssignmentList.propTypes = {};

export default AssignmentList;
