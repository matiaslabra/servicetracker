import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  position: relative;
  padding-top: .35rem;
  cursor: pointer;
  display: block;

  & span {
    background: #fff;
    display: block;
    position: relative;
    width: 1.5rem;
    height: .15rem;
    margin-bottom: .35rem;
    transition: all ease-in-out 0.2s;
  }

  .open span:nth-child(2) {
      opacity: 0;
    }

  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -7px;
  }

  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 7px;
  }

`;

const Toogle = (props) => {
  return (
    <Wrapper onClick={props.onClick}>
      <div className={ props.open ? "open" : "" }>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </Wrapper>
  );
}

export default Toogle;
