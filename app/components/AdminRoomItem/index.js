/**
 *
 * RoomListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import Title from './Title';
import Footer from './Footer';
import ButtonsWrapper from './ButtonsWrapper';
import Button from './Button';

// import styled from 'styled-components';

function AdminRoomItem({ item, clickAction, secClickAction }) {
  return (
    <Box assignKey={item.assignKey}>
      <ButtonsWrapper>
        <Button
          status={item.washDoona}
          onClick={() => {
            secClickAction(item._id, 'washDoona');
          }}
        >
          D
        </Button>
        <Button
          status={item.washCurtain}
          onClick={() => {
            secClickAction(item._id, 'washCurtain');
          }}
        >
          SC
        </Button>
        <Button
          status={item.washMattressProtector}
          onClick={() => {
            secClickAction(item._id, 'washMattressProtector');
          }}
        >
          MP
        </Button>
      </ButtonsWrapper>
      <Title onClick={() => clickAction(item._id)}>{item.name}</Title>
      <Footer>{item.assignArray[item.assignKey]}</Footer>
    </Box>
  );
}

AdminRoomItem.propTypes = {
  item: PropTypes.object,
  clickAction: PropTypes.func.isRequired,
  secClickAction: PropTypes.func.isRequired,
};

export default AdminRoomItem;
