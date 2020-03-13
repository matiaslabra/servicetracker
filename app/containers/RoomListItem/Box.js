import styled from 'styled-components';
import Title from './Title'
import Footer from './Footer'
import ButtonsWrapper from './ButtonsWrapper'

const Box = styled.div`
  overflow:hidden; // children stick to parent border radio
  border-radius: 5px;
  color: ${props => props.assignKey == 0 ? '#000' : '#fff'};
  border: 1px solid;
  border-color:
  ${props => {
    if(props.assignKey == 0){
      return '#fff';
    }else if(props.assignKey == 1){
      return '#eb4d4b';
    }else if(props.assignKey == 2){
      return '#f9ca24';
    }else if(props.assignKey == 3){
      return '#f0932b';
    }else if(props.assignKey == 4){
      return '#eb4d4b';
    }
  }};

  background-color:
    ${props => {
      if(props.assignKey == 0){
        return '#e5e6e6';
      }else if(props.assignKey == 1){
        return '#eb4d4b';
      }else if(props.assignKey == 2){
        return '#f9ca24';
      }else if(props.assignKey == 3){
        return '#f0932b';
      }else if(props.assignKey == 4){
        return '#22a6b3';
      }
    }};

  text-align: center;
  height: 7em;
  width: 7em;
  margin: 10px;

  // Room numer non selectable
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  // to vertically align content
  display: flex;
  justify-content: center;
  flex-direction: column;

  position: relative;
  border-radius: 5px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:after {
    content: "";
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover {
    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
  }
  &:hover::after {
    opacity: 1;
  }

  ${Footer} {
    background-color:
    ${props => {
      if(props.assignKey == 0){
        return '#e5e6e6';
      }else if(props.assignKey == 1){
        return '#eb4d4b';
      }else if(props.assignKey == 2){
        return '#f9ca24';
      }else if(props.assignKey == 3){
        return '#f0932b';
      }else if(props.assignKey == 4){
        return '#22a6b3';
      }
    }};
  }
  ${Title} {
    background-color:
    ${props => {
      if(props.assignKey == 0){
        return '#e5e6e6';
      }else if(props.assignKey == 1){
        return '#eb4d4b';
      }else if(props.assignKey == 2){
        return '#f9ca24';
      }else if(props.assignKey == 3){
        return '#f0932b';
      }else if(props.assignKey == 4){
        return '#22a6b3';
      }
    }};
  }
`;

/**
 * Colors:
 * green: #6ab04c
 * red : eb4d4b
 * yellow: f9ca24
 * orange: f0932b
 */


export default Box;
