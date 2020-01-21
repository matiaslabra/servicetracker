import styled from 'styled-components';
import Title from './Title'
import Footer from './Footer'
import Aditional from './Aditional'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 300px;
  height: 75px;
  background-color: #e5e6e6;;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.75rem;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border: 3px solid;

  border-color:
    ${props => {
      if(props.assignKey == 0){
        return '#22a6b3';
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
  ${Footer} {
    color: ${props => props.hkKey == 0 ? '#000' : '#fff'};
  }
  ${Title} {
    color: ${props => props.hkKey == 0 ? '#000' : '#fff'};
    background-color:
    ${props => {
      if(props.hkKey == 0){
        return '#e5e6e6';
      }else if(props.hkKey == 1){
        return '#f9ca24';
      }else if(props.hkKey == 2){
        return '#2ecc71';
      }else if(props.hkKey == 3){
        return '#f9ca24';
      }else if(props.hkKey == 4){
        return '#f0932b';
      }else if(props.hkKey == 5){
        return '#eb4d4b';
      }
    }};
  }

  ${Aditional} {
    color: ${props => props.hkKey == 0 ? '#000' : '#fff'};
    background-color:
    ${props => {
      if(props.hkKey == 0){
        return '#e5e6e6';
      }else if(props.hkKey == 1){
        return '#f9ca24';
      }else if(props.hkKey == 2){
        return '#2ecc71';
      }else if(props.hkKey == 3){
        return '#f9ca24';
      }else if(props.hkKey == 4){
        return '#f0932b';
      }else if(props.hkKey == 5){
        return '#22a6b3';
      }
    }};
  }
}
`;

/**
 * Colors:
 * green: #6ab04c
 * red : eb4d4b
 * yellow: f9ca24
 * orange: f0932b
 */


export default Wrapper;
