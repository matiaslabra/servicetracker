import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
  padding-top: 0.35rem;
  cursor: pointer;
  display: block;

  & span {
    background: #fff;
    display: block;
    position: relative;
    width: 1.5rem;
    height: 0.15rem;
    margin-bottom: 0.35rem;
    transition: all ease-in-out 0.2s;
  }

  .open span:nth-child(2) {
    opacity: 0;
  }

  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -8px;
  }

  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 8px;
  }
`;

const Toggle = props => (
  <Wrapper onClick={props.onClick}>
    <div className={props.open ? 'open' : ''}>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
    </div>
  </Wrapper>
);

Toggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default Toggle;
