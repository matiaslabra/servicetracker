/**
 *
 * HomeRoomItem
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

function HomeRoomItem({ item, clickAction }) {
  return (
    <Box hkKey={item.hkKey} assignKey={item.assignKey}>
      <ButtonsWrapper>
        {item.washDoona && <Button status={item.washDoona}>D</Button>}
        {item.washCurtain && <Button status={item.washCurtain}>SC</Button>}
        {item.washMattressProtector && (
          <Button status={item.washMattressProtector}>MP</Button>
        )}
      </ButtonsWrapper>
      <Title onClick={() => clickAction(item._id)}>{item.name}</Title>
      <Footer>{item.assignArray[item.assignKey]}</Footer>
      <Footer>{item.hkArray[item.hkKey]}</Footer>
    </Box>
  );
}

HomeRoomItem.propTypes = {
  item: PropTypes.object,
  clickAction: PropTypes.func.isRequired,
};

export default HomeRoomItem;
