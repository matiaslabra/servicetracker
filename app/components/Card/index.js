import React,{ useState, useEffect }  from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper'
import Aditional from './Aditional'
import Title from './Title'
import Info from './Info'
import Descrip from './Descrip'
import Ul from './Ul'
import Box from './Box'
import Footer from './Footer'

;
function Card({
  item,
  clickAction
}) {

  const [cardProperties, setCardProperties] = useState({
    hkKey: item.hkKey,
    hkArray: ['Not taken', 'In progress', 'Done'],
  });

  useEffect(() => {
    // setCardProperties
    if(cardProperties.hkKey != item.hkKey){
      // localStateKey = cardProperties.hkKey;
      setCardProperties({...cardProperties, hkKey: item.hkKey});
    }
  });

  const _cardClickAction = () => {
    // console.log(cardProperties.hkKey)
    let nextKey = cardProperties.hkKey + 1;
    if(nextKey > (cardProperties.hkArray.length-1)){
      nextKey = 0;
    }
    // console.log(nextKey)
    setCardProperties({...cardProperties, hkKey: nextKey});
    clickAction({
      room: item._id,
      _id: item._id,
      hkKey: nextKey,
      type: 'rooms',
      date: item.date
    });
  }


  return (
    <Wrapper
      hkKey={cardProperties.hkKey}
      assignKey={item.assignKey}
      onClick={_cardClickAction}
    >
    <Aditional>
        <Box >
          <Title>{item.room.zone + item.room.name}</Title>
          <Footer>{cardProperties.hkArray[cardProperties.hkKey]}</Footer>
        </Box>
      <Info>
        <Ul>
          <li><b>Room info</b></li>
          <li>Beds: 1 x Queen + 1 x Single</li>
        </Ul>
      </Info>
    </Aditional>
    <Descrip>
      <Ul>
        <li> <b>{ item.service}</b></li>
      </Ul>
    </Descrip>
    </Wrapper>
  );
}

Card.propTypes = {};

export default Card;
